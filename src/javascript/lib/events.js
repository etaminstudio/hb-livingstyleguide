'use strict';

var PubSub = require('pubsub-js');

var Styleguide = window.Styleguide || {};
Styleguide.events = PubSub;
