import {provide, FULLY_CONNECTED, WEBRTC} from '../src/serviceProvider'

xdescribe('Service Provider', () => {
  it('service constant names should be exported', () => {
    expect(WEBRTC).toBeDefined()
    expect(FULLY_CONNECTED).toBeDefined()
  })

  it('should provide a service', () => {
    expect(provide(WEBRTC).name).toEqual('WebRTCService')
    expect(provide(FULLY_CONNECTED).name).toEqual('FullyConnectedService')
  })

  it('FullyConnectedService should be a singleton', () => {
    let fullyConnected1 = provide(FULLY_CONNECTED)
    let fullyConnected2 = provide(FULLY_CONNECTED)
    expect(fullyConnected1).toBe(fullyConnected2)
  })

  it('WebRTCService should NOT be a singleton', () => {
    expect(provide(WEBRTC)).not.toBe(provide(WEBRTC))
  })

  it('Should throw an exception', () => {
    expect(() => provide('Inexistent service name')).toThrow()
  })
})
