import { LineChart, YAxis, CartesianGrid, XAxis, Legend, Line, Tooltip } from 'recharts';

function LoadChart ({data, height, width, dataKey}){
    return(
    
        <div>
            <LineChart width={width} height={height} data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" angle={-10} tick={{fontSize: 11}} />
                <YAxis tick={{fontSize: 11}} />
                <Tooltip />
                <Line type="monotone" dataKey={dataKey} stroke="#8884d8" dot={false} />
            </LineChart>
        </div>
        
    )
}


export default LoadChart;