<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\LayoutManager\Services\Layout as LayoutService;
use Illuminate\Support\Facades\Response;

class LayoutController extends Controller
{   
    /**
     * @var LayoutService
     */
    protected $layout;
    
    /**
     * @param LayoutService  $layout
     */
    public function __construct(LayoutService $layout)
    {
        $this->layout  = $layout;
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        return ;
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        $layoutDetails = $request->all();
        return $this->layout->create($layoutDetails);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        //
    }
    
    /**
     * Download the layput.zip file from given directory
     * 
     * @param int $directory
     * @return type
     */
    public function download($directory)
    {
        return response()->download(storage_path().'/output/'.$directory.'/layout.zip');
    }
}
