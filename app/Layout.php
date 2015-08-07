<?php
namespace App;

/**
 *
 */
class Layout
{
    protected $storagePath;

    public  function __construct()
    {
        $this->storagePath = storage_path();
    }

    public function writeCssInfo($cssFile, $cssInfo)
    {
    	fwrite($cssFile, "/** layout css **/\n");

    	foreach($cssInfo as $key=>$cssClass) {
    		$cssText = ".".$key." {\n" ;

    		foreach($cssClass as $css=>$val) {
    			$cssText .= "\t".$css.": ".$val.";\n" ;
    		}
    		$cssText .= "}\n" ;
    		fwrite($cssFile, $cssText);
    	}
    }


    public function writeDivWithChlid($htmlFile, $cssFile, $cssClass, $layout, $level=0)
    {

    	//write css
    	$layoutCss = ".".$cssClass." {\n";

    	foreach($layout['css'] as $css=>$val) {
    		$layoutCss .= "\t".$css.": ".$val.";\n" ;
    	}
    	$layoutCss .= "}\n" ;
    	fwrite($cssFile, $layoutCss);

    	//write html
    	fwrite($htmlFile, str_repeat("\t", $level).'<div class="'.$layout['className'].'">'."\n");
    	if(isset($layout['child']) && is_array($layout['child'])) {
    		foreach($layout['child'] as $layoutChild) {
    			$this->writeDivWithChlid($htmlFile, $cssFile, $cssClass . ' .' . $layoutChild['className'], $layoutChild, $level+1);

    		}
    	}
    	fwrite($htmlFile, str_repeat("\t", $level).'</div>'."\n");
    }

    public function initDirs($dir)
    {
        if (!file_exists($this->storagePath.'/output')) {
    	       mkdir($this->storagePath.'/output');
        }
        
    	mkdir($this->storagePath.'/output/'.$dir);
    	mkdir($this->storagePath.'/output/'.$dir.'/css');
    	mkdir($this->storagePath.'/output/'.$dir.'/images');
    	mkdir($this->storagePath.'/output/'.$dir.'/js');


    }

    public function getHTMLPre()
    {
    	return "<!DOCTYPE html>
    <html>
    <head lang='en'>
        <meta charset='UTF-8'>
        <title>Layout</title>
        <link rel='stylesheet' type='text/css' href='css/layout.css'>
    </head>
    <body>
    ";
    }

    public function getHTMLPost()
    {
    	return '
    </body>
    </html>';
    }

    public function createCssFile($dir)
    {
    	$cssFile = fopen($this->storagePath.'/output/'.$dir.'/css/layout.css', "w+");
    	return $cssFile;
    }

    public function createHTMLFile($dir, $name)
    {
    	$htmlFile = fopen($this->storagePath.'/output/'.$dir.'/'.$name.'.html', "w+");
    	return $htmlFile;
    }
}
