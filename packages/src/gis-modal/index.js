import gisModal, { gisModalRemove } from './commands/gisModal'
import { gisProcessModal } from './commands/gisProcessModal'

gisModal.process = gisProcessModal

export {
  gisModal,
  gisModalRemove,
  gisProcessModal
}
