const Ajv = require('ajv');
const ajv = new Ajv();

module.exports = {
    validateSurveyUpdate: ajv.compile(require('./schemas/survey-update-schema.json')),
    validateResponse: ajv.compile(require('./schemas/survey-response-schema.json')),
    validateQuestion: ajv.compile(require('./schemas/question-schema.json')),
    validateTemplate: ajv.compile(require('./schemas/survey-template-schema.json')),
}
