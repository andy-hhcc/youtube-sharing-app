import { Connection as ConnectionModel } from '@youtube-sharing-app/core/dal'
import { Connection } from '@youtube-sharing-app/core/domains'

export const connectionMapper = (model: ConnectionModel): Connection => {
  return {
    id: model.id,
    userId: model.userId
  }
}
