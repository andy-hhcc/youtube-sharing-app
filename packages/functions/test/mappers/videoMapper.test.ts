import { describe, it, expect } from 'vitest'
import { videoMapper } from '../../src/mappers'
import { Video as VideoModel } from '@youtube-sharing-app/core/dal'

describe('mapVideoModelToVideo', () => {
  it('with empty input', () => {
    expect(videoMapper({} as unknown as VideoModel)).toEqual({
      id: undefined,
      url: undefined,
      createdBy: undefined,
    })
  })

  it('with normal input', () => {
    expect(
      videoMapper({
        id: '1',
        url: 'url',
        createdBy: 'createdBy',
      } as unknown as VideoModel),
    ).toEqual({
      id: '1',
      url: 'url',
      createdBy: 'createdBy',
    })
  })
})
