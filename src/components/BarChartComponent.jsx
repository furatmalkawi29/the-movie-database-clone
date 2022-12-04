import { ResponsiveBar } from '@nivo/bar'

export const BarChartComponent = ({data}) => {
    
    return(
        <ResponsiveBar
        data={data}
        keys={[
            '1',
            '2',
            '3',
            '4',
            '5',
            'count'
        ]}
        indexBy="rating"
        margin={{ top: 10, right: 0, bottom: 20, left: 0 }}
        padding={0}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'blue_green' }}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    '0'
                ]
            ]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 3,
            tickPadding: 0,
            tickRotation: 0,
            legend: '',
            legendPosition: 'middle',
            legendOffset: 20
        }}
        axisLeft={null}
        enableLabel={false}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    '1.4'
                ]
            ]
        }}
        enableGridY={false}
        legends={[]}
        role="application"
    />
)}
