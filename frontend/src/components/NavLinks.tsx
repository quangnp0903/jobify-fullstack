import { NavLink } from 'react-router-dom';

import links from '../utils/links';
import { useDashboardContext } from '../pages/DashboardLayout';

const NavLinks: React.FC<{ isBigSidebar?: boolean }> = ({
  isBigSidebar = false,
}) => {
  const { toggleSidebar, user } = useDashboardContext();
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, icon } = link;
        const { role } = user;

        // render admin panel only for admin page
        if (role !== 'admin' && path === 'admin') return;

        return (
          <NavLink
            key={path}
            className="nav-link"
            to={path}
            onClick={isBigSidebar ? undefined : toggleSidebar}
            end
          >
            <span className="icon">{icon}</span> {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
