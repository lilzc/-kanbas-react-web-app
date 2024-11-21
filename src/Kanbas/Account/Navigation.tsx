import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

interface AccountState {
  accountReducer: {
    currentUser: any;
  }
}

interface NavLink {
  to: string;
  text: string;
}

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: AccountState) => state.accountReducer);
  const { pathname } = useLocation();
  
  const links: NavLink[] = currentUser 
    ? [{ to: "Profile", text: "Profile" }]
    : [
        { to: "Signin", text: "Sign In" },
        { to: "Signup", text: "Sign Up" }
      ];

  return (
    <div className="list-group" style={{ width: 150 }}>
      {links.map((link) => (
        <Link
          key={link.to}
          to={`/Kanbas/Account/${link.to}`}
          className={`list-group-item ${
            pathname.includes(link.to) ? "active" : ""
          }`}
        >
          {link.text}
        </Link>
      ))}
    </div>
  );
}