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

/**
 * Function to subscribe an object with an event
 */
export function subscribe (subscriber, event: Event, fn) {
  subscriber.tokens = subscriber.tokens || {}

  if (subscriber.tokens[event]) {
    PubSub.unsubscribe(subscriber.tokens[event])
  }

  subscriber.tokens[event] = PubSub.subscribe(event, fn)
}

/**
 * Publish an event
 */
export const publish = PubSub.publish
