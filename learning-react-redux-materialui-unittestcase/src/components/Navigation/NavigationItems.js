import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AccessAlarm from '@mui/icons-material/AccessAlarm';
import ThreeDRotation from '@mui/icons-material/ThreeDRotation';

export const items = [
	{ label: 'Inbox', icon: <InboxIcon size="mediun" />, path: '/', aboveBreaker: true },
	{ label: 'Starred', icon: <MailIcon size="mediun" />, path: '/', aboveBreaker: true },
	{ label: 'Send email', icon: <AccessAlarm size="mediun" />, path: '/', aboveBreaker: true },
	{ label: 'Drafts', icon: <ThreeDRotation size="mediun" />, path: '/', aboveBreaker: true },
	{ label: 'All mail', icon: <InboxIcon size="mediun" />, path: '/', aboveBreaker: false },
	{ label: 'Trash', icon: <MailIcon size="mediun" />, path: '/', aboveBreaker: false },
	{ label: 'Spam', icon: <InboxIcon size="mediun" />, path: '/', aboveBreaker: false }
];