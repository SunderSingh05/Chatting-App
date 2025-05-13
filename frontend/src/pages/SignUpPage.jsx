import { useState } from 'react'
import { Webhook } from "lucide-react";
import { Link } from 'react-router';
import useSignup from '../hooks/useSignup';

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  // const queryClient = useQueryClient();

  // const { mutate: signupMutation, isPending ,error}= useMutation({
  //   mutationFn: signup,
  //   onSuccess: () => queryClient.invalidateQueries({queryKey: ["authUser"] })
  // });

  const {isPending , error , signupMutation} = useSignup();


  const handleSignup = (e) => {
    e.preventDefault()
    signupMutation(signupData)
  }
  return (
    <div className= "h-screen flex items-center justify-center p-4 sm:p-6 md:p-8" data-theme="forest">
      <div className= "border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bs-base-100 rounded-xl shadow-lg overflow-hidden">
  
        {/* signup form leftSide */}

        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/* logo */}
          <div className="mb-4 flex items-center justify-start gap-2">
            <Webhook className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              Chatting App
            </span>
          </div>

          {/* Error message if any */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response.data.message}</span>
            </div>
          )}

          <div className="w-full">
            <form onSubmit={handleSignup}>
              <div className="space-y-4">
                <div> 
                  <h2 className="text-xl font-semibold">Create an Account</h2>
                  <p className="text-sm opacity-70">
                    Join this Chatting App Environment
                  </p>
                </div>
                
                <div className="space-y-3">

                  {/* full name */}

                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Full Name</span>
                    </label>
                    <input type="text" placeholder="Sunder Singh" className="input input-bordered w-full" value={signupData.fullName} onChange={(e)=> setSignupData({ ...signupData ,fullName:e.target.value})} required />
                  </div>

                  {/* email */}

                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="sundersingh@gmail.com" className="input input-bordered w-full" value={signupData.email} onChange={(e)=> setSignupData({ ...signupData, email:e.target.value})} required />
                  </div>

                  {/* Password */}

                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input type="password" placeholder="******" className="input input-bordered w-full" value={signupData.password} onChange={(e)=> setSignupData({ ...signupData, password:e.target.value})} required />
                    <p>Password must be atleast 6 characters long</p>
                  </div>

                  <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-2">
                      <input type="checkbox" className="checkbox checkbox-sm" required />
                      <span className="text-xs leading-tight">
                        I agree to the{" "}
                        <span className="text-primary hover:underline">Terms of services</span> and{" "}
                        <span className="text-primary hover:underline">Privacy policy</span>
                      </span>
                    </label>

                  </div>

                </div>

                <button className="btn btn-primary w-full" type="submit">
                  {isPending ? (
                    <>
                    <span className="loading losading-spinner loading-xs">Loading...</span>
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>

                <div className="text-center mt-4">
                  <p className="text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>

              </div>
            </form>
          </div>
        </div>

        {/* signup form right side */}

        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            {/* Illustrations */}
            <div className="realtive aspect-square max-w-sm mx-auto">
              <img src="/chattingAppImage.png" alt="language connection illustration" className="w-full h-full" />
            </div>

              <div className="text-center space-y-3 mt-6">
                <h2 className="text-xl font-semibold">Connect with People WorldWide</h2>
                <p className="opacity-70">Make Friends and build Connections WorldWide</p>
              </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default SignUpPage