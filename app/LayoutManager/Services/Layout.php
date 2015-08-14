<?php namespace App\LayoutManager\Services;

/**
 * Class Layout
 * Provide service related to layout
 * @package App\LayoutManager\Services\Layout
 */
class Layout
{

    /**
     *
     * @var Unqiue directory
     */
    protected $directory;

    /**
     *
     * @var Storage path 
     */
    protected $storagePath;
    
    /**
     * @var Directory path
     */
    protected $directoryPath;

    /**
     * Initialize require variables.
     */
    public function __construct()
    {
        $this->storagePath = storage_path();
        $this->directory = uniqid();
    }

    public function create($layoutDetails)
    {
        $layouts = $layoutDetails['layout_info'];
        $cssInfo = $layoutDetails['css_info'];
        // Create require directores with unique id        
        $this->initDirs();
        // Create css file
        $cssFile = $this->createCssFile();
        // Write css information in a file
        $this->writeCssInfo($cssFile, $cssInfo);
        // Create html file
        foreach ($layouts as $layout) {
            $htmlFile = $this->createHTMLFile($layout['className']);
            fwrite($htmlFile, $this->getHTMLPre());
            $this->writeDivWithChlid($htmlFile, $cssFile, $layout['className'], $layout);
            fwrite($htmlFile, $this->getHTMLPost());
        }
        // Zip the directory
        $this->zip();
        
        return $this->directory;
    }

    /**
     * Create the zip file.
     * 
     * @return string $zipFilePath Path of created zip file
     */
    public function zip()
    {
        $zipper = new \Chumper\Zipper\Zipper;
        $zipFilePath = $this->storagePath . '/output/' . $this->directory . '/layout.zip';
        $zipper->make($zipFilePath)->folder('layout')->add(
            array(
                $this->storagePath . '/output/' . $this->directory
            )
        );
        
        return $zipFilePath;
    }

    /**
     * Create require directories, if doesn't exist.
     */
    public function initDirs()
    {
        if (!file_exists($this->storagePath . '/output')) {
            mkdir($this->storagePath . '/output');
        }
        
        mkdir($this->storagePath . '/output/' . $this->directory);
        $this->directoryPath = $this->storagePath . '/output/' . $this->directory;
        mkdir($this->directoryPath . '/css');
        mkdir($this->directoryPath . '/images');
        mkdir($this->directoryPath . '/js');
    }

    /**
     * Opens a css file.
     * 
     * @return resource a file pointer
     */
    public function createCssFile()
    {
        return fopen($this->directoryPath . '/css/layout.css', "w+");
    }

    /**
     * Write css informations in a css file.
     * 
     * @param resource $cssFile A file pointer
     * @param array $cssInfo Css informations
     */
    public function writeCssInfo($cssFile, $cssInfo)
    {
        fwrite($cssFile, "/** layout css **/\n");

        foreach ($cssInfo as $key => $cssClass) {
            $cssText = "." . $key . " {\n";

            foreach ($cssClass as $css => $val) {
                $cssText .= "\t" . $css . ": " . $val . ";\n";
            }
            $cssText .= "}\n";
            fwrite($cssFile, $cssText);
        }
    }

    /**
     * Create require layout.
     * 
     * @param resource $htmlFile File pointer of html file
     * @param resource $cssFile File pointer of css file
     * @param string $cssClass Layout type
     * @param array $layout Layout details
     * @param int $level
     */
    public function writeDivWithChlid($htmlFile, $cssFile, $cssClass, $layout, $level = 0)
    {
        //write css
        $layoutCss = "." . $cssClass . " {\n";

        foreach ($layout['css'] as $css => $val) {
            $layoutCss .= "\t" . $css . ": " . $val . ";\n";
        }
        $layoutCss .= "}\n";
        fwrite($cssFile, $layoutCss);

        //write html
        fwrite($htmlFile, str_repeat("\t", $level) . '<div class="' . $layout['className'] . '">' . "\n");
        if (isset($layout['child']) && is_array($layout['child'])) {
            foreach ($layout['child'] as $layoutChild) {
                $this->writeDivWithChlid($htmlFile, $cssFile, $cssClass . ' .' . $layoutChild['className'], $layoutChild, $level + 1);
            }
        }
        fwrite($htmlFile, str_repeat("\t", $level) . '</div>' . "\n");
    }

    /**
     * Return pre html tags.
     * 
     * @return string Pre html tags
     */
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

    /**
     * Return post html tags.
     * 
     * @return string Post html tags
     */
    public function getHTMLPost()
    {
        return '
    </body>
    </html>';
    }

    /**
     * Opens a html file.
     * 
     * @return resource a file pointer
     */
    public function createHTMLFile($name)
    {
        return fopen($this->directoryPath . '/' . $name . '.html', "w+");
    }
}
