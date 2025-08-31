

export const registerFormControls = [
    {
        name:'userName',
        label:'User Name',
        placeholder:'Enter Your User Name ',
        componentType:'input',
        type:'text'
    },
     {
        name:'email',
        label:'Email',
        placeholder:'Enter Your Email ',
        componentType:'input',
        type:'email'
    },
     {
        name:'password',
        label:'Password',
        placeholder:'Enter Your Password',
        componentType:'input',
        type:'password'
    }
]


export const loginFormControls = [

     {
        name:'email',
        label:'Email',
        placeholder:'Enter Your Email ',
        componentType:'input',
        type:'email'
    },
     {
        name:'password',
        label:'Password',
        placeholder:'Enter Your Password',
        componentType:'input',
        type:'password'
    }
]

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    type: "text",
    placeholder: "Enter product description",
  },
  {
    label: "Catagory",
    name: "catagory",
    componentType: "select",
    options: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "kids", label: "Kids" },
      { id: "accessories", label: "Accessories" },
      { id: "footwear", label: "Footwear" },
      { id: "sportswear", label: "Sportswear" }, // extra option
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "nike", label: "Nike" },
      { id: "adidas", label: "Adidas" },
      { id: "puma", label: "Puma" },
      { id: "reebok", label: "Reebok" }, // extra option
      { id: "under-armour", label: "Under Armour" }, // extra option
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (if any)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock quantity",
  },
];

export const customerMenuItem = [
  {
    id : 'home',
    label : 'Home',
    path : '/customer/home'
  },
  {
    id : 'products',
    label : 'Products',
    path : '/customer/listing'
  },
  {
    id : 'men',
    label : 'Men',
    path : '/customer/listing'
  },
  {
    id : 'women',
    label : 'Women',
    path : '/customer/listing'
  },
  {
    id : 'kids',
    label : 'Kids',
    path : '/customer/listing'
  },
  {
    id : 'accessories',
    label : 'Accessories',
    path : '/customer/listing'
  },
   {
    id : 'footwear',
    label : 'Footwear',
    path : '/customer/listing'
  },
   {
    id : 'sportswear',
    label : 'Sportswear',
    path : '/customer/listing'
  },
   {
    id : 'search',
    label : 'Search',
    path : '/customer/search'
  }
]

  export const filterOptions = {
    category : [
      {id:'men',label:'Men'},
      {id:'women',label:'Women'},
      {id:'kids',label:'Kids'},
      {id:'accessories',label:'Accessories'},
      {id:'footwear',label:'Footwear'},
      {id:'sportswear',label:'Sportswear'},
    ],
    brand : [
      {id:'nike',label:'Nike'},
      {id:'adidas',label:'Adidas'},
      {id:'puma',label:'Puma'},
      {id:'reebok',label:'Reebok'},
      {id:'under-armour',label:'under-armour'},


    ]
  }

export const  sortOptions = [
  {id : 'price-lowtohigh' , label : 'price: low to high'},
  {id : 'price-hightolow' , label : 'price: high to low'},
  {id : 'title-AtoZ' , label : 'title: A to Z'},
  {id : 'title-ZtoA' , label : 'price: Z to A'},

]

export const  catagoryOptionsMap = {
  men : 'Men',
  women : 'Women',
  kids : 'Kids',
  accessories : 'Accessories',
  footwear: 'Footwear',
  sportswear : 'Sportswear', 
}

export const  brandOptionsMap = {
  nike : 'Nike',
  adidas : 'Adidas',
  puma : 'Puma',
  reebok: 'Reebok',
   "under-armour": "Under-armour",
  
}

export const addressFormControls = [
  {
    name: 'address',
    label: 'Address',
    placeholder: 'Enter Your Address',
    componentType: 'input',
    type: 'text'
  },
  {
    name: 'city',
    label: 'City',
    placeholder: 'Enter Your City',
    componentType: 'input',
    type: 'text'
  },
  {
    name: 'phone',
    label: 'Phone',
    placeholder: 'Enter Your Phone Number',
    componentType: 'input',
    type: 'text'
  },
  {
    name: 'pincode',
    label: 'Pincode',
    placeholder: 'Enter Your Pincode',
    componentType: 'input',
    type: 'text'
  },
  {
    name: 'notes',
    label: 'Notes',
    placeholder: 'Enter Additional Notes',
    componentType: 'textarea',
    
  }
]


