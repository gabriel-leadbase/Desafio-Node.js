<?php

namespace App\Http\Controllers;

use App\Permission;
use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;


class PermissionController extends Controller
{

    private $permissionModel;

    public function __construct(Permission $permissionModel)
    {
        $this->permissionModel = $permissionModel;
    }
    public function store(Request $request)
    {


        if($request->permission){
            $user = AuthController::me();
            if($user->isAdmin == true){
                $this->permissionModel->create([
                    'name' => $request->permission,
                ]);
            }else{
                return response()->json('Você não possui permissão para acessar essa rota.', 401);
            }
        }else{
            return response()->json('Insira o nome da permissão', 400);

        }

        return response()->json("Permissão Adicionada", 201);
    }

    public function delete(Request $request)
    {
        if($request->permission){
            $user = AuthController::me();
            if($user->isAdmin == true){
                $this->permissionModel->where('name', $request->permission)->delete();
            }else{
                return response()->json('Você não possui permissão para acessar essa rota.', 401);
            }
        }else{
            return response()->json('Insira o nome da permissão', 400);

        }

        return response()->json("Permissão Deletada", 200);

    }
}
