import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {NgZone} from '@angular/core';

import {Platform}               from    'ionic-angular';
import {Modal}                  from    'ionic-angular';
import {Page}                   from    'ionic-angular';


declare var serial: any;
declare var serialWeight: any;
declare var escape: any;
declare var unescape: any;
declare var innerText: any;
var count=0;
@Component({
    templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  public newProd:any    =   {};
	logs:any               =   [];
	logs1: string = "--";
	dataeRead: string = "";
	fats: string = "";
	snf: string = "";
		
	code: string = "";
	name: string = "";
		
		
	milkType: string = "";
	qty: string = "";
		
		
	rate: string = "";
	amt: string = "";
    clr: string = "";
	timeStamp:string="";
    test_str: any = 0;
    temp: any = 0;
    prevtemp: any = 0;
	
    constructor(private navCtrl: NavController, public _zone: NgZone) {
 //this.onClick();
 //this.onClickWeight();
    }

    onPageLoaded() {

        var open = false;
		var openw = false;
        var str = '';
		 var strweight = '';

        var binaryString = '';
        var lastRead = new Date();
        let self = this;
        serial.requestPermission(
            // if user grants permission
            function(successMessage) {
                // open serial port
                serial.open({
                        baudRate: 1200
                    },
                    // if port is succesfuly opened
                    function(successMessage) {
                        open = true;
                        // register the read callback
                        serial.registerReadCallback(
                            function success(data) {

                                // decode the received message
                                var view = new Uint8Array(data);
                                //alert("we are in view"+view);
                                //alert("we are in view"+view.length);
                                if (view.length >= 1) {
                                    for (var i = 0; i < view.length; i++) {
                                        // if we received a \n, the message is complete, display it
                                       
                                      
                                            //var now = new Date();
                                            //var test_str = now - lastRead;
                                            var temp_str = String.fromCharCode(view[i]);
                                            var str_esc = escape(temp_str);
                                            str += unescape(str_esc);
											
                                      
                                    }
									 //return str;
									 // alert(str);
									  
									self._zone.run(()=> {
                                    		 self.dataeRead= str.trim();
                                    		});
										  //self.logs.push(str);
										  var fatReg="FAT:";
										  var snfReg="SNF:";
										  var rateReg="Rate(Rs.):";
										   var reg = new RegExp(" ","g");
										   var test=self.dataeRead.replace(reg,"");
										  var re=/.*FAT:\s+(.*)\s+SNF:.*/;
										  self.dataeRead.replace(reg,"");
										  self.fats=self.dataeRead.replace(re,"$1")
										  var testData=test.replace(/\n|\r/g, "");
										  var re1 = /.*FAT:\s+(.*)\s+SNF:.*/;
										  
										  var newCode = testData.split('Code:').pop().split('Name:').shift();
										  self.code=newCode;
											
										  var newName = testData.split('Name:').pop().split('MilkType:').shift();
										  self.name=newName;
										  //self.name="TEST";
											
										  var newMilkType = testData.split('MilkType:').pop().split('Quantity:').shift();
										  self.milkType=newMilkType;
											
											//var newQty = testData.split('Quantity:').pop().split('FAT:').shift();
										  // self.qty=newQty;
										  
										   var newFat = testData.split('FAT:').pop().split('SNF:').shift();
										   self.fats=newFat;
										  
										   var newSnf = testData.split('SNF:').pop().split('Rate(Rs.):').shift();
										   self.snf=newSnf;
										   
										   var newRate = testData.split('Rate(Rs.):').pop().split('Amount:').shift();
										    self.rate=newRate;
											
											
											
											var newAmt = testData.split('Amount:').pop().split('CLR:').shift();
										    self.amt=newAmt;
											
											var newClr = testData.split('CLR:').pop().split('Shift:').shift();
										    self.clr=newClr;
											
											var newDate = testData.split('Date:').pop().split('Time:').shift();
											
											var newTime = testData.split('Time').pop().split('Code:').shift();
										    self.timeStamp=newDate+""+newTime;
										   
										   
										   
										   
													
										  //alert(newtext);
										 //self.fats=testData.substring(str.indexOf("FAT:")+1);
										
										  //self.snf=self.dataeRead.match(new RegExp(snfReg+"(.*)"+rateReg));
                                      //  self.fats=str.substring(str.indexOf("FAT:")+1);
										// self.snf=str.substring(str.indexOf("SNF:")+1);
                                      
                                    //self.logs="";
                                    /*self._zone.run(()=> {
                                    		 self.logs= str;
                                    		});*/


                                }
                            },
                            // error attaching the callback
                            function error(data) {
                                alert('Error registerReadCallback: ' + data);
                            }
                        );
                    },
                    // error opening the port
                    function error(successMessage) {
                        alert('Error serial open: ' + successMessage);
                    }
                );
            },
            // user does not grant permission
            function error(successMessage) {
                alert('Error while permission ' + successMessage);
            }
        );

       //===============================================this is weighing scale data============================
	   serial.requestPermission(
            // if user grants permission
            function(successMessage) {
                // open serial port
                serial.open({
                        baudRate: 9600
                    },
                    // if port is succesfuly opened
                    function(successMessage) {
                        open = true;
                        // register the read callback
                        serial.registerReadCallback(
                            function success(data) {

                                // decode the received message
                                var view = new Uint8Array(data);
                                //alert("we are in view"+view);
                                //alert("we are in view"+view.length);
                                if (view.length >= 1) {
                                    for (var i = 0; i < view.length; i++) {
                                        // if we received a \n, the message is complete, display it
                                       
                                      
                                            //var now = new Date();
                                            //var test_str = now - lastRead;
                                            var temp_strw = String.fromCharCode(view[i]);
                                            var str_escw = escape(temp_strw);
                                            strweight += unescape(str_escw);
											
                                      
                                    }
									 //return str;
									  console.log("weight:-"+strweight);
									  self.qty=strweight;
									
                                }
                            },
                            // error attaching the callback
                            function error(data) {
                                alert('Error registerReadCallback: ' + data);
                            }
                        );
                    },
                    // error opening the port
                    function error(successMessage) {
                        alert('Error serial open: ' + successMessage);
                    }
                );
            },
            // user does not grant permission
            function error(successMessage) {
                alert('Error while permission ' + successMessage);
            }
        );
	   
	   //===============================================end of weighing scale data===========================


    }; //end of page loaded
 //if (open) {serial.write('0');}
onClickMilkAnalyzer()
{
	 alert("on milk analyzer");
	var self = this;
        self.logs="";
        if (open) serial.write('0');
        self.temp = 1;
};

onClickWeight()
{
	 alert("on weight click");
      var self = this;
        self.logs="";
        if (open) serial.write('1');
        self.temp = 1;	
};
    /*findUSBDevices1() {
        //alert('click');
        var self = this;
        self.logs="";
        if (open) serial.write('1');
        self.temp = 1;
       
    };

    findUSBDevices2() {
        //alert('click2');
        self.logs="";
        var self = this;
        if (open) serial.write('0');
        self.temp = 2;
       
    }*/


}