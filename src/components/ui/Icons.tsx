import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBell,
  faCamera,
  faCircleCheck,
  faClock,
  faComment,
  faCopy,
  faDroplet,
  faFileLines,
  faHouse,
  faLightbulb,
  faList,
  faLocationDot,
  faMap,
  faPlus,
  faRoad,
  faRightFromBracket,
  faShareNodes,
  faTrashCan,
  faTree,
  faTicket,
  faThumbsUp,
  faUser,
} from '@fortawesome/free-solid-svg-icons'

interface IconProps {
  className?: string
}

export const HomeIcon = ({ className }: IconProps) => (
  <FontAwesomeIcon icon={faHouse} className={className} />
)

export const MapIcon = ({ className }: IconProps) => (
  <FontAwesomeIcon icon={faMap} className={className} />
)

export const ListIcon = ({ className }: IconProps) => (
  <FontAwesomeIcon icon={faList} className={className} />
)

export const DocumentIcon = ({ className }: IconProps) => (
  <FontAwesomeIcon icon={faFileLines} className={className} />
)

export const UserIcon = ({ className }: IconProps) => (
  <FontAwesomeIcon icon={faUser} className={className} />
)

export const ClockIcon = ({ className }: IconProps) => (
  <FontAwesomeIcon icon={faClock} className={className} />
)

export const CheckIcon = ({ className }: IconProps) => (
  <FontAwesomeIcon icon={faCircleCheck} className={className} />
)

export const TicketIcon = ({ className }: IconProps) => (
  <FontAwesomeIcon icon={faTicket} className={className} />
)

export const PinIcon = ({ className }: IconProps) => (
  <FontAwesomeIcon icon={faLocationDot} className={className} />
)

export const BellIcon = ({ className }: IconProps) => (
  <FontAwesomeIcon icon={faBell} className={className} />
)

export const PlusIcon = ({ className }: IconProps) => (
  <FontAwesomeIcon icon={faPlus} className={className} />
)

export const CameraIcon = ({ className }: IconProps) => (
  <FontAwesomeIcon icon={faCamera} className={className} />
)

export const ThumbsUpIcon = ({ className }: IconProps) => (
  <FontAwesomeIcon icon={faThumbsUp} className={className} />
)

export const MessageIcon = ({ className }: IconProps) => (
  <FontAwesomeIcon icon={faComment} className={className} />
)

export const ShareIcon = ({ className }: IconProps) => (
  <FontAwesomeIcon icon={faShareNodes} className={className} />
)

export const LogoutIcon = ({ className }: IconProps) => (
  <FontAwesomeIcon icon={faRightFromBracket} className={className} />
)

export const CopyIcon = ({ className }: IconProps) => (
  <FontAwesomeIcon icon={faCopy} className={className} />
)

export const SparkIcon = ({ className }: IconProps) => (
  <FontAwesomeIcon icon={faLightbulb} className={className} />
)

export const RoadIcon = ({ className }: IconProps) => (
  <FontAwesomeIcon icon={faRoad} className={className} />
)

export const WaterIcon = ({ className }: IconProps) => (
  <FontAwesomeIcon icon={faDroplet} className={className} />
)

export const TrashIcon = ({ className }: IconProps) => (
  <FontAwesomeIcon icon={faTrashCan} className={className} />
)

export const TreeIcon = ({ className }: IconProps) => (
  <FontAwesomeIcon icon={faTree} className={className} />
)
