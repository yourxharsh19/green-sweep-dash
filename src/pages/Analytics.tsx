import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Download } from 'lucide-react';

const wasteByType = [
  { type: 'Organic', amount: 540 },
  { type: 'Plastic', amount: 320 },
  { type: 'Paper', amount: 260 },
  { type: 'Metal', amount: 120 },
  { type: 'Glass', amount: 180 },
];

const collectionTrends = [
  { month: 'Jan', collected: 820, recycled: 610 },
  { month: 'Feb', collected: 760, recycled: 590 },
  { month: 'Mar', collected: 910, recycled: 700 },
  { month: 'Apr', collected: 980, recycled: 740 },
  { month: 'May', collected: 1040, recycled: 780 },
  { month: 'Jun', collected: 990, recycled: 760 },
];

const routeEfficiency = [
  { route: 'A', distance: 34, time: 2.4, stops: 12 },
  { route: 'B', distance: 28, time: 1.9, stops: 9 },
  { route: 'C', distance: 42, time: 3.1, stops: 15 },
  { route: 'D', distance: 31, time: 2.2, stops: 11 },
];

const COLORS = ['#16a34a', '#60a5fa', '#f59e0b', '#ef4444', '#8b5cf6'];

const chartConfig = {
  collected: {
    label: 'Collected (kg)',
    color: 'hsl(var(--primary))',
  },
  recycled: {
    label: 'Recycled (kg)',
    color: 'hsl(var(--success))',
  },
  amount: {
    label: 'Amount (kg)',
    color: 'hsl(var(--primary))',
  },
};

const Analytics = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">Insights for city-wide waste management</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Waste Collection Trend</CardTitle>
            <CardDescription>Monthly collected vs recycled (kg)</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-72">
              <LineChart data={collectionTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="collected" stroke="var(--color-collected)" strokeWidth={2} />
                <Line type="monotone" dataKey="recycled" stroke="var(--color-recycled)" strokeWidth={2} />
                <ChartLegend content={<ChartLegendContent />} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Waste by Type</CardTitle>
            <CardDescription>Distribution across categories (kg)</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-72">
              <PieChart>
                <Pie data={wasteByType} dataKey="amount" nameKey="type" outerRadius={100} label>
                  {wasteByType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent nameKey="type" />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Route Efficiency</CardTitle>
          <CardDescription>Distance, time and stops per route</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-80">
            <BarChart data={routeEfficiency}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="route" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="distance" name="Distance (km)" fill="var(--color-collected)" />
              <Bar dataKey="stops" name="Stops" fill="var(--color-recycled)" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;


