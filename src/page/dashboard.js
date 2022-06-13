import TableComponent from '../component/table';
import 'antd/dist/antd.less';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios'
import { Input, Row, Col, Tooltip, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
// import { data } from '../component/table/constantData';
import { GlobalContext } from '../component/context/GlobalState';

function Dashboard() {
    const {state} = useContext(GlobalContext) 
    const [isAuth, setIsAuth] = useState(false)
    const [name, setName] = useState('')
    const [searchData, setSearchData] = useState()
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_URL}/customers`,
                {headers: { 'Content-Type': 'application/json',
                Authorization: `${localStorage.getItem("Authorization")}`
                }})
            .then(response => {
            if(response.status === 200){
                setIsAuth(true)
                setSearchData(response.data.data)
            }
            return
            })
            .catch(error => {
                console.log(error.data)
            })
    },[])
    const next = `==>`
    const handleSearch = ()=> {
        let findData = searchData.filter(o=> o.name.includes(name))
        setSearchData(findData)
    }
  return (
    <>     
      <h1>Customers Data</h1>
      {isAuth?
            <div className='top-container'>
                <Row className='search'>
                    <Col span={20}>
                        <Input placeholder='type customer name to search or filter' onChange={e=>setName(e.target.value)} value={name}></Input>
                    </Col>
                    <Col span={2}>
                        <Tooltip title="search">
                            <Button type="primary" shape="circle" icon={<SearchOutlined />} onClick={handleSearch}/>
                        </Tooltip>
                    </Col>
                    <Col span={2}>
                        <Button onClick={()=>setSearchData(state.customers) && setName('')}>Reset</Button>
                    </Col>
                </Row>
                <TableComponent search={searchData}/>
            </div>
        :
        <h2>Anda Belum Login {next} Back to 'host/' page</h2>
    }

    </>
  );
}

export default Dashboard;