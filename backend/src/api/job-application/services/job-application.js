'use strict';

/**
 * job-application service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::job-application.job-application');
