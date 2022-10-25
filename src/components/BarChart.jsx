// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bar
import { ResponsiveBar } from '@nivo/bar'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export const MyResponsiveBar = ({ /* see data tab */ }) => {
 
    
    const data = [
        {
          "country": "1",
          "Rating": 50,
          "rateColor": "hsl(101, 70%, 50%)"
        },
        {
          "country": "2",
          "Rating": 10,
          "rateColor": "hsl(90, 70%, 50%)"
        },
        {
          "country": "3",
          "Rating": 30,
          "rateColor": "hsl(276, 70%, 50%)"
        },
        {
          "country": "4",
          "Rating": 50,
          "rateColor": "hsl(345, 70%, 50%)"
        },
        {
          "country": "5",
          "Rating": 30,
          "rateColor": "hsl(229, 70%, 50%)"
        },
        {
          "country": "6",
          "Rating": 20,
          "rateColor": "hsl(77, 70%, 50%)"
        },
        {
          "country": "7",
          "Rating": 15,
          "rateColor": "hsl(138, 70%, 50%)"
        },
        {
          "country": "8",
          "Rating": 5,
          "rateColor": "hsl(138, 70%, 50%)"
        },
        {
          "country": "9",
          "Rating": 4,
          "rateColor": "hsl(138, 70%, 50%)"
        },
        {
          "country": "10",
          "Rating": 10,
          "rateColor": "hsl(138, 70%, 50%)"
        }
      ]
    
    return(
        <ResponsiveBar
        data={data}
        keys={[
            'hot dog',
            'burger',
            'sandwich',
            'kebab',
            'fries',
            'Rating'
        ]}
        indexBy="country"
        margin={{ top: 10, right: 0, bottom: 20, left: 0 }}
        padding={0}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'blue_green' }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
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
        barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in country: "+e.indexValue}}
    />
)}
