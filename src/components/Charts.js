import { LineChart, YAxis, CartesianGrid, XAxis, Line, Tooltip, ResponsiveContainer } from 'recharts';
import "../Charts.css";


function LoadChart ({data, height, width, dataKey, min, max}){


    max = Math.floor(max);
    min = Math.floor(min);


    let minPrice = min - (min*0.01);
    let maxPrice = max + (max*0.01);

    console.log("MIN PRICE SHOWED:", min, minPrice)
    console.log("MAX PRICE SHOWED:", max, maxPrice)

    return(
    
        <ResponsiveContainer width="100%">
            <LineChart data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            
            >
                <CartesianGrid opacity={0.5} />
                <XAxis dataKey="time" angle={-10} tick={{fontSize: 11}} tickCount={5} />
                <YAxis tick={{fontSize: 11}} domain={[minPrice, maxPrice]} tickCount={10} />
                <Tooltip />
                <Line type="monotone" dataKey={dataKey} stroke="#8884d8" dot={false} />
            </LineChart>
        </ResponsiveContainer>
        
    )
}

function ErrorChart({message}){

    const data = [
        { name: "A", uv: 4000, pv: 2400, amt: 2400 },
        { name: "B", uv: 3000, pv: 1398, amt: 2210 },
        { name: "C", uv: 2000, pv: 9800, amt: 2290 },
        { name: "D", uv: 2780, pv: 3908, amt: 2000 },
        { name: "E", uv: 1890, pv: 4800, amt: 2181 },
        { name: "F", uv: 2390, pv: 3800, amt: 2500 },
        { name: "G", uv: 3490, pv: 4300, amt: 2100 }
      ];
      

    return(
        
            <ResponsiveContainer width="100%">
                <LineChart data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }} className="bluredBox"
                >   
                    <text x={400} y={200} textAnchor="middle" dominantBaseline="middle" className='positionRelative'>
                        DONUT
                    </text>
                    <CartesianGrid opacity={0.5} />
                    <XAxis dataKey="name" tickLine={false} />
                    <YAxis tickLine={false} axisLine={false} />
                    
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" dot={false} />
                </LineChart>
            </ResponsiveContainer>
        
    )
}

function TinyChart ({data, dataKey}){

    let max = Math.max(...data.map(o => o.price));
    let min = Math.min(...data.map(o => o.price));

    let minPrice = min - (min*0.005);
    let maxPrice = max + (max*0.005);

    let lineColor;

    data[0].price > data[data.length-1].price ? lineColor = 'red' : lineColor = 'green';

    return(
    
        <ResponsiveContainer width="100%" minHeight={'80px'}>
            <LineChart data={data}
            margin={{ top: 30, right: 0, left: 0, bottom: 0 }}
            viewBox={"0 0 500 300"}
            >
                {/* <CartesianGrid opacity={0.5} /> */}
                <XAxis dataKey="time" tick={false} axisLine={false} />
                <YAxis tick={false} domain={[minPrice, maxPrice]} axisLine={false} />
                {/* <Tooltip /> */}
                <Line type="monotone" dataKey={dataKey} stroke={lineColor} dot={false} />
            </LineChart>
        </ResponsiveContainer>
        
    )
}


export {LoadChart, ErrorChart, TinyChart};