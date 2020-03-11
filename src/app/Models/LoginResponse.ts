import { MemberRole } from './MemberRole';
import { Header } from './Header';

export class LoginResponse {
    UserId: number;
    UserName: string;
    DisplayName: string;
    Token: string;
    MemberPin: string;
    PhoneNumber: string;
    AppPhoneNo: string;
    ProfilePhoto: string;
    MemberRole: MemberRole[];
    Header: Header;
}
