import HomeIcon from '@mui/icons-material/Home';
import ShortTextIcon from '@mui/icons-material/ShortText';
import ShutterSpeedRoundedIcon from '@mui/icons-material/ShutterSpeedRounded';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import NoteAltRoundedIcon from '@mui/icons-material/NoteAltRounded';
import NetworkPingRoundedIcon from '@mui/icons-material/NetworkPingRounded';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ProductionQuantityLimitsRoundedIcon from '@mui/icons-material/ProductionQuantityLimitsRounded';
import BusinessIcon from '@mui/icons-material/Business';
import LocalConvenienceStoreRoundedIcon from '@mui/icons-material/LocalConvenienceStoreRounded';
import DesignServicesRoundedIcon from '@mui/icons-material/DesignServicesRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import MarkEmailReadRoundedIcon from '@mui/icons-material/MarkEmailReadRounded';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import PageviewRoundedIcon from '@mui/icons-material/PageviewRounded';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import ReviewsRoundedIcon from '@mui/icons-material/ReviewsRounded';
import PhotoRoundedIcon from '@mui/icons-material/PhotoRounded';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import BlockRoundedIcon from '@mui/icons-material/BlockRounded';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import PasswordRoundedIcon from '@mui/icons-material/PasswordRounded';

export const featuresList = [
    {id: 1, icon: <ShutterSpeedRoundedIcon />, title: 'capture more leads', detail: 'Claim your listing and promote your products and services to gain more customers'},
    {id: 2, icon: <NoteAltRoundedIcon />, title: 'All listings in one place', detail: 'Claim your listing and promote your products and services to gain more customers'},
    {id: 3, icon: <NetworkPingRoundedIcon />, title: 'Business Growth', detail: 'Claim your listing and promote your products and services to gain more customers'},
]

export const categoryOptions = [
    {id: 1, name: 'fashion', value: 'Fashion'},
    {id: 2, name: 'tech', value: 'Crypto'},
    {id: 3, name: 'blog', value: 'Blog'},
]

export const planOptions = [
    {id: 1, name: 'free', value: 'Free'},
    {id: 2, name: 'paid', value: 'Paid'},
]

export const navLinks = [
    { id: 1, name: 'Home', link: '/'},
    // { id: 2, name: 'dashboard', link: '/dashboard'},
    // { id: 3, name: 'profile', link: '/profile'},
    // { id: 4, name: 'user', link: '/profile/user'},
]

export const categoryList = [
    {id: 1, icon: <PeopleRoundedIcon />, title: 'People'},
    {id: 2, icon: <ProductionQuantityLimitsRoundedIcon />, title: 'Products'},
    {id: 3, icon: <LocalConvenienceStoreRoundedIcon />, title: 'Marketing'},
    {id: 4, icon: <BusinessIcon />, title: 'Projects'},
    {id: 5, icon: <DesignServicesRoundedIcon />, title: 'Services'},
]

export const rightbarLink = [
    {id: 1, name: 'Dashboard', link: '/dashboard'},
    {id: 2, name: 'Profile', link: '/profile/user'},
    {id: 3, name: 'Subscription', link: '/subscription'},
]

export const freeSubscriptionPlan = [
    {id: 1, text: 'Add up to 4 url links', image: <CheckRoundedIcon />},
    {id: 2, text: 'Link all social media pages', image: <CheckRoundedIcon />},
    {id: 3, text: 'Add contact info - Email, Phone Number', image: <CheckRoundedIcon />},
    {id: 4, text: 'Add location - Google direction', image: <CheckRoundedIcon />},
    {id: 5, text: 'Add Gallery', image: <CheckRoundedIcon />},
    {id: 6, text: 'top trends', image: <CheckRoundedIcon />},
]

export const painSubscriptionPlan = [
    {id: 1, text: 'Everything on free plan', image: <CheckRoundedIcon />},
    {id: 2, text: 'Multiple locations - google directions', image: <CheckRoundedIcon />},
    {id: 3, text: 'Add products', image: <CheckRoundedIcon />},
    {id: 4, text: 'Embed youtube link', image: <CheckRoundedIcon />},
    {id: 5, text: 'unlimited links', image: <CheckRoundedIcon />},
    {id: 6, text: 'get promoted on fanzlink homepage', image: <CheckRoundedIcon />},
]

const faqs = [
    {
      id: 1,
      header: "how do i navigate fanzlink profile ?",
      text: "Velit ipsum amet minim laborum voluptate aliquip fugiat enim ipsum sit sunt. Excepteur tempor ad sit commodo ut occaecat cillum tempor nisi in. Mollit dolore eiusmod aliqua irure laborum amet laboris. Enim nostrud anim ut velit aliquip ad quis irure fugiat ex aliqua aliqua elit. Ipsum officia sit quis sint. Anim enim qui qui do duis qui consequat cillum."
    },
    {
      id: 2,
      header: "how do i contact customer support ?",
      text: "Velit ipsum amet minim laborum voluptate aliquip fugiat enim ipsum sit sunt. Excepteur tempor ad sit commodo ut occaecat cillum tempor nisi in. Mollit dolore eiusmod aliqua irure laborum amet laboris. Enim nostrud anim ut velit aliquip ad quis irure fugiat ex aliqua aliqua elit. Ipsum officia sit quis sint. Anim enim qui qui do duis qui consequat cillum. Enim nostrud anim ut velit aliquip ad quis irure fugiat ex aliqua aliqua elit. Ipsum officia sit quis sint. Anim enim qui qui do duis qui consequat cillum Enim nostrud anim ut velit aliquip ad quis irure fugiat ex aliqua aliqua elit. Ipsum officia sit quis sint. Anim enim qui qui do duis qui consequat cillum"
    },
    {
      id: 3,
      header: "Is my email address visible to others ?",
      text: "Velit ipsum amet minim laborum voluptate aliquip fugiat enim ipsum sit sunt. Excepteur tempor ad sit commodo ut occaecat cillum tempor nisi in. Mollit dolore eiusmod aliqua irure laborum amet laboris. Enim nostrud anim ut velit aliquip ad quis irure fugiat ex aliqua aliqua elit. Ipsum officia sit quis sint. Anim enim qui qui do duis qui consequat cillum."
    }
]

export {
    HomeIcon,
    ShortTextIcon,
    ShutterSpeedRoundedIcon,
    ConnectWithoutContactIcon,
    FacebookRoundedIcon,
    TwitterIcon,
    InstagramIcon,
    LocationOnIcon,
    SupportAgentRoundedIcon,
    ShareRoundedIcon,
    FacebookIcon,
    WhatsAppIcon,
    ArrowDownwardRoundedIcon,
    ArrowUpwardRoundedIcon,
    SearchRoundedIcon,
    KeyboardArrowUpRoundedIcon,
    KeyboardArrowDownRoundedIcon,
    SendRoundedIcon,
    CallRoundedIcon,
    EmailRoundedIcon,
    MarkEmailReadRoundedIcon,
    VisibilityIcon,
    VisibilityOffIcon,
    AddBoxRoundedIcon,
    EditRoundedIcon,
    DeleteRoundedIcon,
    PageviewRoundedIcon,
    LinkRoundedIcon,
    ArrowBackIosRoundedIcon,
    ArrowForwardIosRoundedIcon,
    CloudUploadRoundedIcon,
    PersonRoundedIcon,
    ReviewsRoundedIcon,
    PhotoRoundedIcon,
    RocketLaunchRoundedIcon,
    SettingsRoundedIcon,
    LockRoundedIcon,
    faqs,
    CheckRoundedIcon,
    CheckCircleOutlineRoundedIcon,
    BlockRoundedIcon,
    KeyboardBackspaceRoundedIcon,
    PasswordRoundedIcon,
}