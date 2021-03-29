<?php
namespace App\Http\Controllers;

use App\User;
use App\Permission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    private $userModel;
    private $permissionModel;

    public function __construct(User $userModel, Permission $permissionModel)
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
        $this->userModel = $userModel;
        $this->permissionModel = $permissionModel;
    }

    //metodo de registro do usuario
    public function register(Request $request){
        
        $validator = Validator::make($request->all(), [
            'cpf' => 'required|min:11|max:11',
            'password' => 'required',
            'isAdmin' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json("Insira credenciais validas.", 401);
        }


        $user = $this->userModel->where('cpf', $request->cpf)->first();
        if($user){
            return $this->login();
        }
        $this->userModel->create([

            'cpf' => $request->cpf,
            'password' => bcrypt($request->password),
            'isAdmin' => $request->isAdmin
        ]);

        return $this->login();
    }

    //metodo de login do usuario
    public function login()
    {
        $credentials = request(['cpf', 'password']);

        $validator = Validator::make($credentials, [
            'cpf' => 'required|min:11|max:11',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json("Insira credenciais validas", 400);
        }

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }


    
    public static function me(){
        return response()->json(auth()->user())->getData();
    }


    protected function respondWithToken($token)
    {

        $user = $this->me();
        if($user->isAdmin == true){
            $role = 'Administrador';
            $permissions = $this->permissionModel->all();
        }else{
            $role = 'Vendedor';
            $permissions = 'Você não possui permissões';
        }

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'role' => $role,
            'permissions' => $permissions,
            
        ], 200);
    }
}
