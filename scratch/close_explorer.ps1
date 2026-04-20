$app = New-Object -ComObject Shell.Application
$windows = $app.Windows()
foreach ($window in $windows) {
    if ($window.FullName -like "*explorer.exe") {
        $window.Quit()
    }
}
