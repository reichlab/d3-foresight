/**
 * Module specifying events for pubsub
 */

import * as PubSub from 'pubsub-js'
import { Event } from './interfaces'

// Control panel button events
export const MOVE_NEXT : Event = 'MOVE_NEXT'
export const MOVE_PREV : Event = 'MOVE_PREV'
export const TOGGLE_LEGEND : Event = 'TOGGLE_LEGEND'

// Legend toggles
export const LEGEND_ITEM : Event = 'LEGEND_ITEM'
export const LEGEND_CI : Event = 'LEGEND_CI'
export const LEGEND_ALL : Event = 'LEGEND_ALL'

// Exposed hooks
export const JUMP_TO_INDEX : Event = 'JUMP_TO_INDEX'
export const FORWARD_INDEX : Event = 'FORWARD_INDEX'
export const BACKWARD_INDEX : Event = 'BACKWARD_INDEX'

function initTokens (subscriber, event: Event) {
  subscriber.tokens = subscriber.tokens || {}
  if (!subscriber.tokens[event]) {
    subscriber.tokens[event] = []
  }
}

/**
 * Reset all subscriptions
 */
export function resetSub (subscriber, event: Event) {
  initTokens(subscriber, event)
  subscriber.tokens[event].forEach(tk => PubSub.unsubscribe(tk))
}

/**
 * Function to subscribe an object with an event
 */
export function subscribe (subscriber, event: Event, fn) {
  initTokens(subscriber, event)
  subscriber.tokens[event].push(PubSub.subscribe(event, fn))
}

/**
 * Publish an event
 */
export const publish = PubSub.publish
