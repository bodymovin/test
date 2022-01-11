package main
import "fmt"
import "os"

func main() {
    fmt.Println("hello go start")
		bytesTest, err := os.ReadFile("./test.txt");
		if err != nil {
			fmt.Println(err);
		} else {
			fileText := string(bytesTest[:]); // fileText is "Hello World!"
    	fmt.Println(fileText);
		}
		jsTest, errJs := os.ReadFile("./index.js");
		if errJs != nil {
			fmt.Println(errJs);
		} else {
			fileJSText := string(jsTest[:]); // fileText is "Hello World!"
    	fmt.Println(fileJSText);
		}
		////
		cmd := exec.Command("goldctl")
		args := []string{"auth", "--work-dir", "./tmp"}
		cmd := exec.Command("goldctl", args...)
    fmt.Println("hello go end")
}