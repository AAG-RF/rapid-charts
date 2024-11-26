import  ChartCreator  from '@/components/ChartCreator';

const customData = [
  { name: 'A', value: 100, value2: 50 },
  { name: 'B', value: 200, value2: 150 },
];

export default function Home() {
  return (
    <ChartCreator 
      initialChartType="bar"
      data={customData}
    />
  );
}