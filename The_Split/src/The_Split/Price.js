import { useEffect, useState} from 'react';

function Price(){
const [data, setData] = useState([]);
useEffect(()=>{
    fetch("http://localhost:80/TheSplitBar.php")
    .then(response=>response.json())
    .then(json=>setData(json))
})




return (
    <ul>
        {data.map(item => 
            <li key={item.id}>{item.CharterNmae} {item.DrinkName} {item.Category} {item.CategoryBadge}</li>
    )}
    </ul>
)

}
export default Price;