var Busboy = require('busboy');
var path = require('path');
var fs = require('fs');
var sha1 = require('sha1');
const Profile = require('../schemas/patientprofile');
// Load User Model
const User = require('../schemas/patient');
const res = require('express/lib/response');
// Gets a filename extension.
const moment = require('moment');
function getExtension(filename) {
  return filename.split('.').pop();
}

// Test if a file is valid based on its extension and mime type.
function isFileValid(filename, mimetype) {
  var allowedExts = ['txt', 'pdf', 'doc', 'jpg', 'png', 'jpeg'];
  var allowedMimeTypes = [
    'text/plain',
    'application/msword',
    'application/x-pdf',
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/jpg',
  ];

  // Get file extension.
  var extension = getExtension(filename);

  return (
    allowedExts.indexOf(extension.toLowerCase()) != -1 &&
    allowedMimeTypes.indexOf(mimetype) != -1
  );
}

function upload(req, callback) {
  // console.log('requser', req.user);
  // The route on which the file is saved.
  var fileRoute = '/uploads/';

  // Server side file path on which the file is saved.
  var saveToPath = null;

  // Flag to tell if a stream had an error.
  var hadStreamError = null;

  // Used for sending response.
  var link = null;

  // Stream error handler.
  function handleStreamError(error) {
    // Do not enter twice in here.
    if (hadStreamError) {
      return;
    }

    hadStreamError = error;

    // Cleanup: delete the saved path.
    if (saveToPath) {
      return fs.unlink(saveToPath, function (err) {
        return callback(error);
      });
    }

    return callback(error);
  }

  // Instantiate Busboy.
  try {
    var busboy = new Busboy({ headers: req.headers });
  } catch (e) {
    return callback(e);
  }

  // console.log('file_upload.js: file received');
  // Handle file arrival.
  busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
    // Check fieldname:
    if ('file' != fieldname) {
      // Stop receiving from this stream.
      file.resume();

      return callback('Fieldname is not correct. It must be file.');
    }
    //console.log('file_upload.js: file received');
    // Generate link.
    var randomName = sha1(new Date().getTime()) + '.' + getExtension(filename);
    link = fileRoute + randomName;
    var prescription = {};
    //  console.log(req.headers);
    if (req.headers.val) prescription.Date = new Date(req.headers.val);
    if (req.headers.doctor) prescription.Doctor = req.headers.doctor;
    if (req.headers.lab) prescription.Lab = req.headers.lab;
    if (req.headers.patient) prescription.patient = req.headers.patient;
    if (link) prescription.url = link;
    if (prescription.doctor)
      Profile.findOne({ user: req.user }).then((profile) => {
        if (profile) {
          // Updatene
          Profile.findOneAndUpdate(
            { user: req.user },
            { $push: { Prescription: prescription } }
          ).catch((err) => console.log(err));
        } else {
          // Create
          // Save Profile
          res.json('profile not found');
        }
      });
    else
      Profile.findOne({ user: req.user }).then((profile) => {
        if (profile) {
          // Updatene
          Profile.findOneAndUpdate(
            { user: req.user },
            { $push: { LabReport: prescription } }
          ).catch((err) => console.log(err));
        } else {
          // Create
          // Save Profile
          res.json('profile not found');
        }
      });
    // Generate path where the file will be saved.
    var appDir = path.dirname(require.main.filename);
    saveToPath = path.join(appDir, link);

    // Pipe reader stream (file from client) into writer stream (file from disk).
    file.on('error', handleStreamError);

    // Create stream writer to save to file to disk.
    var diskWriterStream = fs.createWriteStream(saveToPath);
    diskWriterStream.on('error', handleStreamError);

    // Validate file after it is successfully saved to disk.
    diskWriterStream.on('finish', function () {
      // Check if file is valid
      var status = isFileValid(saveToPath, mimetype);

      if (!status) {
        return handleStreamError('File does not meet the validation.');
      }

      return callback(null, { link: link });
    });

    // Save file to disk.
    file.pipe(diskWriterStream);
  });

  // Handle file upload termination.
  busboy.on('error', handleStreamError);
  req.on('error', handleStreamError);

  // Pipe reader stream into writer stream.
  return req.pipe(busboy);
}
module.exports = upload;
