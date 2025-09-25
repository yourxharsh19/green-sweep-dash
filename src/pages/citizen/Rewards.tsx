import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gift, Award, Ticket, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

type Reward = {
  id: number;
  title: string;
  points: number;
  description: string;
};

const availableRewards: Reward[] = [
  { id: 1, title: '10% Off Municipal Fee', points: 200, description: 'Discount on next month fee' },
  { id: 2, title: 'Local Store Voucher', points: 350, description: '₹200 voucher for partner stores' },
  { id: 3, title: 'Eco Tote Bag', points: 150, description: 'Reusable tote for sustainable living' },
];

const history = [
  { id: 101, date: '2024-01-14', item: 'Weekly recycling', points: 10 },
  { id: 102, date: '2024-01-12', item: 'Reported litter spot', points: 15 },
  { id: 103, date: '2024-01-10', item: 'Neighborhood cleanup', points: 30 },
];

const Rewards = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const redeem = (reward: Reward) => {
    if ((user?.points || 0) < reward.points) {
      toast({ title: 'Not enough points', description: `You need ${reward.points} points to redeem.` });
      return;
    }
    toast({ title: 'Redeemed!', description: `${reward.title} redeemed successfully.` });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Rewards</h1>
          <p className="text-muted-foreground">Earn points and redeem perks</p>
        </div>
        <div className="flex items-center gap-2">
          <Award className="h-6 w-6 text-accent" />
          <span className="text-lg font-semibold">{user?.points || 0} pts</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Available Rewards</CardTitle>
            <CardDescription>Choose a reward to redeem</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {availableRewards.map((reward) => (
              <div key={reward.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium flex items-center gap-2"><Gift className="h-4 w-4" /> {reward.title}</p>
                  <p className="text-sm text-muted-foreground">{reward.description}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="bg-accent text-accent-foreground">{reward.points} pts</Badge>
                  <Button size="sm" onClick={() => redeem(reward)}>
                    Redeem <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Points History</CardTitle>
            <CardDescription>How you earned your points</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {history.map((h) => (
              <div key={h.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium flex items-center gap-2"><Ticket className="h-4 w-4" /> {h.item}</p>
                  <p className="text-sm text-muted-foreground">{h.date}</p>
                </div>
                <Badge variant="outline" className="bg-accent text-accent-foreground">+{h.points} pts</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Rewards;


