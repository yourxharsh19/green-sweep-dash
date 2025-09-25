import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UserPlus, Shield, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const users = [
  { id: 1, name: 'Ava Patel', email: 'ava@example.com', role: 'citizen', points: 240 },
  { id: 2, name: 'Rohan Mehta', email: 'rohan@example.com', role: 'citizen', points: 120 },
  { id: 3, name: 'Admin Rao', email: 'admin@example.com', role: 'authority', points: 0 },
];

const UsersPage = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

  const promote = (name: string) => toast({ title: 'Role updated', description: `${name} promoted to authority` });
  const remove = (name: string) => toast({ title: 'User removed', description: `${name} has been removed` });
  const add = () => setOpen(true);
  const sendInvite = () => {
    if (!inviteEmail.includes('@')) {
      toast({ title: 'Invalid email', description: 'Please enter a valid email address.' });
      return;
    }
    toast({ title: 'Invite sent', description: `Invitation email sent to ${inviteEmail}` });
    setInviteEmail('');
    setOpen(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manage Users</h1>
          <p className="text-muted-foreground">View users, update roles, and remove accounts</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={add}>
              <UserPlus className="h-4 w-4 mr-2" /> Invite User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite a new user</DialogTitle>
              <DialogDescription>Send an email invite to join as citizen or authority.</DialogDescription>
            </DialogHeader>
            <div className="space-y-2 py-2">
              <label className="text-sm font-medium">Email</label>
              <Input placeholder="name@example.com" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={sendInvite}>Send Invite</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>Mock data for demo purposes</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Points</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium">{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>
                    <Badge variant={u.role === 'authority' ? 'default' : 'outline'}>
                      {u.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{u.points}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button size="sm" variant="outline" onClick={() => promote(u.name)}>
                      <Shield className="h-4 w-4 mr-1" /> Promote
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => remove(u.name)}>
                      <Trash2 className="h-4 w-4 mr-1" /> Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersPage;
