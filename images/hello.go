package main
import "fmt"
import "os"
import "os/exec"
import "bytes"

func execCommand(command string, args []string) {
	fmt.Println("==============");
	fmt.Println("execCommand");
	cmd := exec.Command(command, args...);
	var out bytes.Buffer;
	var stderr bytes.Buffer;
	cmd.Stdout = &out;
	cmd.Stderr = &stderr;
	err := cmd.Run();
	if err != nil {
		fmt.Println(fmt.Sprint(err) + ": " + stderr.String());
		return;
	}
	fmt.Println("Result: " + out.String());
}

func main() {
    fmt.Println("hello go start")
		bytesTest, err := os.ReadFile("./test.txt");
		if err != nil {
			fmt.Println(err);
		} else {
			fileText := string(bytesTest[:]); // fileText is "Hello World!"
    	fmt.Println(fileText);
		}
		// jsTest, errJs := os.ReadFile("./index.js");
		// if errJs != nil {
		// 	fmt.Println(errJs);
		// } else {
		// 	fileJSText := string(jsTest[:]); // fileText is "Hello World!"
    // 	fmt.Println(fileJSText);
		// }
		////
		execCommand("goldctl", []string{""});
		execCommand("goldctl", []string{"auth", "--work-dir", "./tmp"});
		// cmd := exec.Command("goldctl")
		// args := []string{"auth", "--work-dir", "./tmp"}
		// cmd2 := exec.Command("goldctl", args...)
    fmt.Println("hello go end")
}