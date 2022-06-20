const router = require('express').Router();
const { User, Job } = require('../models');
const withAuth = require('../utils/auth');

