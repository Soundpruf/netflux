import { WebChannel, WebChannelState as WebGroupState } from './service/WebChannel';
import { Topology } from './service/topology/Topology';
import { SignalingState } from './Signaling';
/**
 * @ignore
 */
export declare const wcs: WeakMap<WebGroup, WebChannel>;
export declare type DataTypeView = string | Uint8Array;
/**
 * This class is an API starting point. It represents a peer to peer network,
 * simply called a group. Each group member can send/receive broadcast
 * as well as personal messages, invite other persons or bots (see {@link WebGroupBotServer}).
 * @example
 * // Create a WebGroup with full mesh topology, autorejoin feature and
 * // specified Signaling and ICE servers for WebRTC.
 *
 * const wg = new WebGroup({
 *   signalingURL: 'wss://mysignaling.com'
 *   iceServers: [
 *     {
 *       urls: 'stun.l.google.com:19302'
 *     },
 *     {
 *       urls: ['turn:myturn.com?transport=udp', 'turn:myturn?transport=tcp'],
 *       username: 'user',
 *       password: 'password'
 *     }
 *   ]
 * })
 *
 * wg.onMemberJoin = (id) => {
 *   // TODO...
 * }
 * wg.onMemberLeave = (id) => {
 *   // TODO...
 * }
 * wg.onMessage = (id, msg, isBroadcast) => {
 *   // TODO...
 * }
 * wg.onStateChanged = (state) => {
 *   // TODO...
 * }
 * wg.onSignalingStateChanged = (state) => {
 *   // TODO...
 * }
 */
export declare class WebGroup {
    /**
     * @param {WebGroupOptions} [options]
     * @param {Topology} [options.topology=Topology.FULL_MESH]
     * @param {string} [options.signalingURL='wss://www.coedit.re:20473']
     * @param {RTCIceServer[]} [options.iceServers=[{urls: 'stun:stun3.l.google.com:19302'}]]
     * @param {boolean} [options.autoRejoin=true]
     */
    constructor(options?: any);
    /**
     * {@link WebGroup} identifier. The same value for all members.
     * @type {number}
     */
    readonly id: number;
    /**
     * Your unique member identifier in the group.
     * @type {number}
     */
    readonly myId: number;
    /**
     * An array of member identifiers (except yours).
     * @type {number[]}
     */
    readonly members: number[];
    /**
     * Topology identifier.
     * @type {Topology}
     */
    readonly topology: Topology;
    /**
     * The state of the {@link WebGroup} connection.
     * @type {WebGroupState}
     */
    readonly state: WebGroupState;
    /**
     * The state of the signaling server.
     * @type {SignalingState}
     */
    readonly signalingState: SignalingState;
    /**
     * The signaling server URL.
     * @type {string}
     */
    readonly signalingURL: string;
    /**
     * If equals to true, auto rejoin feature is enabled.
     * @type {boolean}
     */
    /**
     * Enable/Desable the auto rejoin feature.
     * @type {boolean}
     */
    autoRejoin: boolean;
    /**
     * This handler is called when a message has been received from the group.
     * @type {function(id: number, msg: DataTypeView, isBroadcast: boolean)}
     */
    onMessage: (id: number, msg: DataTypeView, isBroadcast: boolean) => void;
    /**
     * This handler is called when a new member has joined the group.
     * @type {function(id: number)}
     */
    onMemberJoin: (id: number) => void;
    /**
     * This handler is called when a member hes left the group.
     * @type {function(id: number)}
     */
    onMemberLeave: (id: number) => void;
    /**
     * This handler is called when the group state has changed.
     * @type {function(state: WebGroupState)}
     */
    onStateChanged: (state: WebGroupState) => void;
    /**
     * This handler is called when the signaling state has changed.
     * @type {function(state: SignalingState)}
     */
    onSignalingStateChanged: (state: SignalingState) => void;
    /**
     * Join the group identified by a key provided by one of the group member.
     * @param {string} key
     */
    join(key: string): void;
    /**
     * Invite a bot server to join this group.
     * @param {string} url - Bot server URL (See {@link WebGroupBotServerOptions})
     */
    invite(url: string): void;
    /**
     * Close the connection with Signaling server.
     */
    closeSignaling(): void;
    /**
     * Leave the group which means close channels with all members and connection
     * with Signaling server.
     */
    leave(): void;
    /**
     * Broadcast a message to the group.
     * @param {DataTypeView} data
     */
    send(data: DataTypeView): void;
    /**
     * Send a message to a particular group member.
     * @param {number}    id Member identifier
     * @param {DataTypeView}  data Message
     */
    sendTo(id: number, data: DataTypeView): void;
    /**
     * Get web group latency
     * @return {Promise<number>} Latency in milliseconds
     */
    ping(): Promise<number>;
}
