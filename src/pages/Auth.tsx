import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Recycle, User, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<'citizen' | 'authority'>('citizen');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  
  const { login, register, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let success = false;
      if (isLogin) {
        success = await login(formData.email, formData.password, role);
      } else {
        success = await register(formData.name, formData.email, formData.password, role);
      }
      
      if (success) {
        toast({
          title: "Success!",
          description: `Welcome ${isLogin ? 'back' : 'to EcoWaste'}!`,
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Error",
          description: "Invalid credentials. Try citizen@demo.com or authority@demo.com",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Recycle className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl">EcoWaste System</CardTitle>
          <CardDescription>
            Smart Waste Management for a cleaner future
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs value={isLogin ? 'login' : 'register'} onValueChange={(v) => setIsLogin(v === 'login')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  variant={role === 'citizen' ? 'default' : 'outline'}
                  onClick={() => setRole('citizen')}
                  className="flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Citizen
                </Button>
                <Button
                  type="button"
                  variant={role === 'authority' ? 'default' : 'outline'}
                  onClick={() => setRole('authority')}
                  className="flex items-center gap-2"
                >
                  <Shield className="h-4 w-4" />
                  Authority
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="register" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  variant={role === 'citizen' ? 'default' : 'outline'}
                  onClick={() => setRole('citizen')}
                  className="flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Citizen
                </Button>
                <Button
                  type="button"
                  variant={role === 'authority' ? 'default' : 'outline'}
                  onClick={() => setRole('authority')}
                  className="flex items-center gap-2"
                >
                  <Shield className="h-4 w-4" />
                  Authority
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder={role === 'citizen' ? 'citizen@demo.com' : 'authority@demo.com'}
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                required
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Please wait...' : (isLogin ? 'Login' : 'Register')}
            </Button>
          </form>
          
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Demo accounts: citizen@demo.com | authority@demo.com
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;