  let data = [
    {
      key: '1',
      id: 1,
      name: 'Clark Kerluke',
      address: '429 Yundt Center\nJaniyaport, AK 09433',
      country: 'Greenland',
      phoneNumber: '234.560.0976',
      jobTitle: 'Personal Service Worker',
      status: false,
    },
    {
      key: '2',
      id: 2,
      name: 'Ahahahah',
      address: '429 Yundt Center\nJaniyaport, AK 09433',
      country: 'Greenland',
      phoneNumber: '234.560.0976',
      jobTitle: 'Personal Service Worker',
      status: false,
    },
    {
      key: '3',
      id: 3,
      name: 'Lalalili',
      address: '429 Yundt Center\nJaniyaport, AK 09433',
      country: 'Greenland',
      phoneNumber: '234.560.0976',
      jobTitle: 'Personal Service Worker',
      status: true,
    },
  ];

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  /* eslint-disable no-template-curly-in-string */
  
  const validateMessages = {
    required: `This input is required!`,
    types: {
      name: `This input is not a valid name!`,
      address: `This input is not a valid number!`,
    },
  };

export {data, validateMessages, layout}