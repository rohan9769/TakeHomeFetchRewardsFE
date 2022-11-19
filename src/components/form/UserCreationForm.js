import { useState } from "react";
import PassCreationField from "./PassCreationField";
import SuccessPopup from "./SuccessPopup";

const UserCreationForm = (props) => {

  const initialState = {
    name: "",
    occupation: "",
    state: "",
    email: "",
    password: "",
    confirmPassword: "",
    errors: {
      fullName: '',
      occupation: '',
      state: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  }

  const [userForm, setUserForm] = useState(initialState);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)

  const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );
  const validateForm = errors => {
    let valid = true;
    Object.values(errors).forEach(val => val.length > 0 && (valid = false));
    return valid;
  };

  // This is to ensure that entire form is filled upon submit
  const isEmpty = () => {
    if(userForm.name === '' || userForm.occupation === '' || userForm.state === '' || userForm.email === '' || userForm.password === '' || userForm.confirmPassword === '') {
      return true
    } return false
  }

  // Mapping data to display occupation options
  const occupationElements = props.endpointData?.occupations?.map((index) => (
    <option key={index}>{index}</option>
  ));

  // Mapping data to display state option
  const stateElements = props.endpointData?.states?.map((index) => (
    <option key={index.name}>{index.name}</option>
  ));

  const handleChange = (e) => {
    const name = e.target.name; 
    const value = e.target.value;
    let errors = userForm.errors;

    // Form error checking
    switch (name) {
      case 'name': 
        errors.fullName = 
          value.length < 5
            ? 'Full Name must be at least 5 characters long!'
            : '';
        break;

        case 'occupation': 
        errors.occupation = 
          value === '' || value === 'Occupation'
            ? 'required'
            : '';
        break;
        case 'state': 
        errors.state = 
        value === '' || value === 'State'
            ? 'required'
            : '';
        break;

      case 'email': 
        errors.email = 
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
        break;
      case 'password': 
        errors.password = 
          value.length < 8
            ? 'Password must be at least 8 characters long!'
            : '';
        break;
        case 'confirmPassword': 
        errors.confirmPassword = 
          value !== userForm.password
            ? 'Confirmation password doesn\'t match!'
            : '';
        break;
      default:
        break;
    }
    setUserForm({
      ...userForm,
      [name]: value
    })
    if(validateForm(userForm.errors) && !isEmpty()) {
      setIsSubmitDisabled(false)
    } else {
      setIsSubmitDisabled(true)
    }
  }

  const handleSubmit = () => {
    if(validateForm(userForm.errors)) {
      console.info('Valid Form')
      fetch(`https://frontend-take-home.fetchrewards.com/form`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: userForm.name,
          occupation: userForm.occupation,
          state: userForm.state,
          email: userForm.email,
          password: userForm.password,
        }),
      })
      .then(res => {
        // console.log(res)
        if (res.status === 201) {
          console.log("201 success!")
          setUserForm(initialState);
          setIsSubmitDisabled(true)
        }
      }) // if status is 201 reset state and enable submit button

    }else{
      console.error('Invalid Form')
      console.log(userForm.errors);
    }
  };
  
  return (
    <>
      <div className="card flex-shrink-0 w-full shadow-2xl bg-violet-300 pt-3 sm:pt-7
      max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#440D8C] text-center">
          User Creation Form
        </h1>
        
        <div className="card-body text-[#300C38]">
          <div className="form-control py-2">
            <input
              type="text"
              placeholder="Enter Full Name"
              name="name" value={userForm.name}
              onChange={handleChange}
              className="input input-bordered bg-white focus:border-[#440D8C]"
            />
            {userForm.errors.fullName !== '' && (
              <p className="text-sm text-[#f87171] pt-2">{userForm.errors.fullName}</p>
            )}
          </div>

          <div className="xl:flex lg:gap-3 focus:bg-[#440D8C]">
            <select
            name="occupation" value={userForm.occupation}
            onChange={handleChange}
            className="select select-ghost bg-white focus:bg-[#440D8C] focus:text-white shadow-md mb-2 lg:m-0">
              <option>Occupation</option>
              {occupationElements}
            </select>

            {userForm.errors.occupation !== '' && (
              <p className="text-sm text-[#f87171] mb-2">{userForm.errors.occupation}</p>
            )}
            <select
            name="state" value={userForm.state}
            onChange={handleChange}
            className="select select-ghost bg-white focus:bg-[#440D8C] focus:text-white shadow-md mt-2 lg:m-0">
              <option>State</option>
              {stateElements}
            </select>

            {userForm.errors.state !== '' && (
              <p className="text-sm text-[#f87171] my-2">{userForm.errors.state}</p>
            )}
          </div>

          <div className="form-control py-2">
            <input
              type="email"
              placeholder="email"
              name="email" value={userForm.email}
              onChange={handleChange}
              className="input input-bordered bg-white focus:border-[#440D8C]"
            />
            {userForm.errors.email !== '' && (
              <p className="text-sm text-[#f87171] pt-2">{userForm.errors.email}</p>
            )}
          </div>

          <PassCreationField userForm={userForm} handleChange={handleChange} />
          <SuccessPopup handleSubmit={handleSubmit} isSubmitDisabled={isSubmitDisabled} />

         

        </div>
      </div>
    </>
  );
};
export default UserCreationForm;
