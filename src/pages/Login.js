
import phlog from'../image/1-removebg-preview .png';
import './login.css';


export default function Login(){

return(

<>

<div class="containerd">
    <div class="photod">
        <img src={phlog} class="ph"/>
       
   </div>
<form class="id">
   
    <input type="email" id="input1" placeholder="Email" />
     
      <input type="password" id="input2" placeholder="Password"/>
      <button className="bt111a">Login</button>
      <button className="bt222a">Create new account</button>
      <a class="forget" href="./Forgot">Forgot password?</a>
      </form>
</div>

</>

);



};