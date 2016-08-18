'use strict';

/**
 * A dialog for selecting users for a new Conversation.
 *
 * Can also be used for updating participants in an existing Conversation.
 *
 * Manages a Dialog and a `<layer-user-list/>` widget
 */


var Backbone = require('backbone');

module.exports = Backbone.View.extend({
  el: '.participants-dialog',
  initialize: function(client) {
    this.$el.find('.button-ok').on('click', this.createConversation.bind(this));
    this.listNode = this.$el.find('layer-user-list')[0];

    /**
     * Create Identity List Query
     */
    this.query = client.createQuery({
      model: layer.Query.Identity
    });

    /**
     * Setup the <layer-user-list /> widget
     */
    this.listNode.query = this.query;
    this.listNode.client = client;
  },

  /**
   * In the future, you may want this to be setParticipants so
   * you can use it to update the participants in a Conversation.
   */
  clearParticipants: function() {
    this.listNode.selectedUsers = [];
  },

  /**
   * Tell the Controller to create the Conversation.
   */
  createConversation: function() {
    var participants = this.listNode.selectedUsers;
    this.hide();
    this.trigger('conversation:create', participants);
  },
  events: {
    'click .participant-list-container': 'clickStopPropagation',
    'click': 'hide'
  },
  clickStopPropagation: function(e) {
    e.stopPropagation();
  },
  show: function() {
    this.$el.removeClass('hidden');
  },
  hide: function() {
    this.$el.addClass('hidden');
  }
});