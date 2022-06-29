const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema;

const PreliminaryDiagnosis = mongoose.Schema({
  AppointmentId: {
    type: Schema.Types.ObjectId,
    ref: 'appoinment',
    required: true,
  },
  Diagnosis: {
    question: {
      type: { type: String },
      text: { type: String },
      items: [
        {
          id: { type: String },
          name: { type: String },
          choices: [
            {
              id: { type: String },
              label: { type: String },
            },
          ],
        },
      ],
      extras: {},
    },
    conditions: [
      {
        id: { type: String },
        name: { type: String },
        common_name: { type: String },
        probability: { type: Number },
        condition_details: {
          icd10_code: { type: String },
          category: {
            id: { type: String },
            name: { type: String },
          },
          prevalence: { type: String },
          severity: { type: String },
          acuteness: { type: String },
          triage_level: { type: String },
          hint: { type: String },
        },
      },
    ],
    extras: {},
    should_stop: { type: Boolean },
  },
  Evidence: [
    {
      id: { type: String },
      choice_id: { type: String },
      source: { type: String },
    },
  ],
  Triage: {
    triage_level: { type: String },
    serious: [
      {
        id: { type: String },
        name: { type: String },
        common_name: { type: String },
        is_emergency: { type: Boolean },
      },
    ],
    root_cause: { type: String },
    teleconsultation_applicable: { type: Boolean },
  },
  Specialist: {
    recommended_specialist: {
      id: { type: String },
      name: { type: String },
    },
    recommended_channel: { type: String },
  },
  Explain: [
    {
      condition_id: { type: String },
      supporting_evidence: [
        {
          id: { type: String },
          name: { type: String },
          common_name: { type: String },
        },
      ],
      conflicting_evidence: [
        {
          id: { type: String },
          name: { type: String },
          common_name: { type: String },
        },
      ],
      unconfirmed_evidence: [
        {
          id: { type: String },
          name: { type: String },
          common_name: { type: String },
        },
      ],
    },
  ],
});

module.exports = mongoose.model('preliminaryDiagnosis', PreliminaryDiagnosis);
