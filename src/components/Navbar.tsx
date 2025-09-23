import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Recycle, LogOut, User, Shield } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  if (!user) return null;

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-card border-b border-border px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Recycle className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">EcoWaste</span>
          </div>
          
          <div className="flex space-x-4">
            <Button 
              variant={isActive('/dashboard') ? 'default' : 'ghost'}
              onClick={() => navigate('/dashboard')}
            >
              Dashboard
            </Button>
            
            {user.role === 'citizen' && (
              <>
                <Button 
                  variant={isActive('/bins') ? 'default' : 'ghost'}
                  onClick={() => navigate('/bins')}
                >
                  Nearby Bins
                </Button>
                <Button 
                  variant={isActive('/rewards') ? 'default' : 'ghost'}
                  onClick={() => navigate('/rewards')}
                >
                  Rewards
                </Button>
                <Button 
                  variant={isActive('/report') ? 'default' : 'ghost'}
                  onClick={() => navigate('/report')}
                >
                  Report Issue
                </Button>
              </>
            )}
            
            {user.role === 'authority' && (
              <>
                <Button 
                  variant={isActive('/analytics') ? 'default' : 'ghost'}
                  onClick={() => navigate('/analytics')}
                >
                  Analytics
                </Button>
                <Button 
                  variant={isActive('/users') ? 'default' : 'ghost'}
                  onClick={() => navigate('/users')}
                >
                  Manage Users
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            {user.role === 'citizen' ? <User className="h-4 w-4" /> : <Shield className="h-4 w-4" />}
            <span className="text-sm font-medium">{user.name}</span>
            {user.role === 'citizen' && user.points !== undefined && (
              <span className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-semibold">
                {user.points} pts
              </span>
            )}
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;