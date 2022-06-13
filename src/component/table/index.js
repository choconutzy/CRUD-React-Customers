import { Button, Modal, Row, Col, Table, Input, Select } from 'antd';
import React, { useEffect, useState, useContext } from 'react';
import {FaTrashAlt} from 'react-icons/fa'
import {BsFillPencilFill} from 'react-icons/bs'
import { data } from './constantData';
import { GlobalContext } from '../context/GlobalState';
import axios from 'axios';

const TableComponent = ({search}) => {
  const {addCustomer, editCustomer, deleteCustomer} = useContext(GlobalContext)
  const columns = [
    {
      title: 'No',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <p>{text}</p>,
      sorter: (a, b) => a.name[0].charCodeAt(0) - b.name[0].charCodeAt(0),
      
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
      title: 'Job Title',
      dataIndex: 'job_title',
      key: 'job_title',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        {
          text: 'True',
          value: true,
        },
        {
          text: 'False',
          value: false,
        }
      ],
      render: (x)=> x===false? 'FALSE': 'TRUE',
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <Row gutter={[6,0]}>
          <Col>
            <Button onClick={()=>showEditModal(record)} shape='circle'><BsFillPencilFill color='blue' size={12}/></Button>
          </Col>
          <Col>
            <Button danger onClick={()=>onDeleteCustomer(record)} shape='circle'><FaTrashAlt color='red' size={12}/></Button>
          </Col>
        </Row>
      ),
    },
  ];

  const [isEditing, setIsEditing] = useState(false)
  const [isAdd, setIsAdd] = useState(false)
  const [customer, setCustomer] = useState({
    id: 1,
    name: 'Clark Kerluke',
    address: '429 Yundt Center\nJaniyaport, AK 09433',
    country: 'Greenland',
    phone_number: '234.560.0976',
    job_title: 'Personal Service Worker',
    status: false,
    created_at: "2022-06-10T03:07:17.000000Z",
    updated_at: "2022-06-10T03:07:17.000000Z"
  })
  const showEditModal = (record) => {
    setIsEditing(true)
    console.log(record)
    setCustomer(record)
    console.log(customer)
  }



  const onDeleteCustomer = (record) => {
    console.log(record.name)
    Modal.confirm({
      title: `Are you sure, you want to delete this customers record? \n name: ${record.name}`,
      okType: 'danger' ,
      okText: 'Yes',
      onOk: ()=>{
        setCustomer(record)
        deleteCustomer(customer)
      }
    })
  }
  const onEditSubmit = () => {
    setIsEditing(false)
    console.log(customer)
    editCustomer(customer)
  }
  const handleCancel = () => {
    setIsEditing(false)
    setIsAdd(false)
  }
  const showAddModal = () => {
    setIsAdd(true)
  }
  const onAddCustomer = () => {
    setCustomer({...customer, id: search.length +=1})
    setIsAdd(false)
    addCustomer(customer)
  };
  return (
    <>
      <div className='add-customer'>
        <Button onClick={showAddModal}>Add Customer</Button>
      </div>
      {search?<Table columns={columns} dataSource={search} />:<></>}
      <p>{`No Data`}</p>
      <Modal title="Add Customers" visible={isAdd} onCancel={handleCancel} okText='Add' onOk={onAddCustomer}>
      <>
            <div className='label-input'>
              <div className='label'>
                <Col>
                  <label>Name :</label>
                </Col>
              </div>
                <Col span={20}>
                  <div className='input'>
                  <Input value={customer?.name}  onChange={(e)=> setCustomer({...customer, name : e.target.value})}/>
                  </div>
                </Col>
            </div>
            <div className='label-input'>
              <div className='label'>
                <Col>
                  <label>Address :</label>
                </Col>
              </div>
                <Col span={20}>
                  <div className='input'>
                  <Input value={customer?.address}  onChange={(e)=> setCustomer({...customer, address : e.target.value})}/>
                  </div>
                </Col>
            </div>
            <div className='label-input'>
              <div className='label'>
                <Col>
                  <label>Country:</label>
                </Col>
              </div>
                <Col span={20}>
                  <div className='input'>
                  <Input value={customer?.country}  onChange={(e)=> setCustomer({...customer, country : e.target.value})}/>
                  </div>
                </Col>
            </div>
            <div className='label-input'>
              <div className='label'>
                <Col>
                  <label>Phone Number :</label>
                </Col>
              </div>
                <Col span={20}>
                  <div className='input'>
                  <Input value={customer?.phone_number}  onChange={(e)=> setCustomer({...customer, phone_number : e.target.value})}/>
                  </div>
                </Col>
            </div>
            <div className='label-input'>
              <div className='label'>
                <Col>
                  <label>Job Title :</label>
                </Col>
              </div>
                <Col span={20}>
                  <div className='input'>
                  <Input value={customer?.job_title}  onChange={(e)=> setCustomer({...customer, job_title : e.target.value})}/>
                  </div>
                </Col>
            </div>
            <div className='label-input'>
              <div className='label'>
                <Col>
                  <label>Status :</label>
                </Col>
              </div>
                <Col span={20}>
                  <div>
                    <Select defaultValue={false} onClick={(e)=> setCustomer({...customer, status : e.target.value})}>
                    <Select.Option value={true}>True</Select.Option>
                    <Select.Option value={false}>False</Select.Option>
                    </Select>
                  </div>
                </Col>
            </div>
        </>
      </Modal>
      <Modal title="Edit Customers" visible={isEditing} okText='Save' onOk={onEditSubmit} onCancel={handleCancel}>
        <>
            <div className='label-input'>
              <div className='label'>
                <Col>
                  <label>Name :</label>
                </Col>
              </div>
                <Col span={20}>
                  <div className='input'>
                  <Input value={customer?.name}  onChange={(e)=> setCustomer({...customer, name : e.target.value})}/>
                  </div>
                </Col>
            </div>
            <div className='label-input'>
              <div className='label'>
                <Col>
                  <label>Address :</label>
                </Col>
              </div>
                <Col span={20}>
                  <div className='input'>
                  <Input value={customer?.address}  onChange={(e)=> setCustomer({...customer, address : e.target.value})}/>
                  </div>
                </Col>
            </div>
            <div className='label-input'>
              <div className='label'>
                <Col>
                  <label>Country:</label>
                </Col>
              </div>
                <Col span={20}>
                  <div className='input'>
                  <Input value={customer?.country}  onChange={(e)=> setCustomer({...customer, country : e.target.value})}/>
                  </div>
                </Col>
            </div>
            <div className='label-input'>
              <div className='label'>
                <Col>
                  <label>Phone Number :</label>
                </Col>
              </div>
                <Col span={20}>
                  <div className='input'>
                  <Input value={customer?.phone_number}  onChange={(e)=> setCustomer({...customer, phone_number : e.target.value})}/>
                  </div>
                </Col>
            </div>
            <div className='label-input'>
              <div className='label'>
                <Col>
                  <label>Job Title :</label>
                </Col>
              </div>
                <Col span={20}>
                  <div className='input'>
                  <Input value={customer?.job_title}  onChange={(e)=> setCustomer({...customer, job_title : e.target.value})}/>
                  </div>
                </Col>
            </div>
            <div className='label-input'>
              <div className='label'>
                <Col>
                  <label>Status :</label>
                </Col>
              </div>
                <Col span={20}>
                  <div>
                    <Select defaultValue={false} onClick={(e)=> setCustomer({...customer, status : e.target.value})}>
                    <Select.Option value={true}>True</Select.Option>
                    <Select.Option value={false}>False</Select.Option>
                    </Select>
                  </div>
                </Col>
            </div>
        </>
      </Modal>
    </>
  )
};

export default TableComponent;