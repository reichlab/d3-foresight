/**
 * Module specifying events for pubsub
 */

import * as PubSub from 'pubsub-js'
import { Event } from './interfaces'

// Control panel button events
export const PANEL_MOVE_NEXT : Event = 'PANEL_MOVE_NEXT'
export const PANEL_MOVE_PREV : Event = 'PANEL_MOVE_PREV'
export const PANEL_TOGGLE : Event = 'PANEL_TOGGLE'

// Legend toggles
export const LEGEND_ITEM : Event = 'LEGEND_ITEM'
export const LEGEND_CI : Event = 'LEGEND_CI'
export const LEGEND_ALL : Event = 'LEGEND_ALL'

// Exposed hooks
export const JUMP_TO_INDEX : Event = 'JUMP_TO_INDEX'
export const FORWARD_INDEX : Event = 'FORWARD_INDEX'
export const BACKWARD_INDEX : Event = 'BACKWARD_INDEX'

/**
 * Reset all subscriptions for an event
 */
export function resetSub (prefix: string, event: Event) {
  PubSub.unsubscribe(`${prefix}.${event}`)
}

/**
 * Remove subscription for a token
 */
export function removeSub (token) {
  PubSub.unsubscribe(token)
}

/**
 * Function to subscribe an object with an event
 */
export function addSub (prefix: string, event: Event, fn) {
  return PubSub.subscribe(`${prefix}.${event}`, fn)
}

/**
 * Publish an event
 */
export function publish (prefix: string, event: Event, data) {
  PubSub.publish(`${prefix}.${event}`, data)
}
