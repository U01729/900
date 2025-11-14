//------BIG THANKS TO SISTRO FOR THIS !!!!!--------

var LoadedMSG = "تم تحميل الأداة (Payload)!";

var getPayload = function(payload, onLoadEndCallback) {
  var req = new XMLHttpRequest();
  req.open('GET', payload);
  req.send();
  req.responseType = "arraybuffer";
  req.onload = function (event) {
      if (onLoadEndCallback) onLoadEndCallback(req, event);
  };
}

var sendPayload = function(url, data, onLoadEndCallback) {
  var req = new XMLHttpRequest();
  req.open("POST", url, true);
  req.send(data);

  req.onload = function (event) {
      if (onLoadEndCallback) onLoadEndCallback(req, event);
  };
}

//Load payloads with GoldHEN

function Loadpayloadlocal(PLfile){ //Loading Payload via Payload Param.
    var PS4IP = "127.0.0.1";

	// First do an initial check to see if the BinLoader server is running, ready or busy.
	var req = new XMLHttpRequest();
    if (PS4IP == "127.0.0.1") {
      req.open("POST", `http://${PS4IP}:9090/status`);
    } else {
      req.open("GET", `http://${PS4IP}:9090/status`);
    }
		req.send();
		req.onerror = function(){
			console.log("BinLoader Server is not running, trying online payload loading...");
            Loadpayloadonline(PLfile);
			return;
		};
		req.onload = function(){
			var responseJson = JSON.parse(req.responseText);
			if (responseJson.status=="ready"){
		    getPayload(PLfile, function (req) {
				if ((req.status === 200 || req.status === 304) && req.response) {
				    //Sending bins via IP POST Method
                    sendPayload(`http://${PS4IP}:9090`, req.response, function (req) {
                        if (req.status === 200) {
                            //alert("Payload sent !");
                        }else{
                            console.log('Payload not sent, trying online payload loading...');
                            setTimeout(() => {
                                Loadpayloadonline(PLfile);
                            }, 3000); // 3 seconds delay
                            return;
                        }
                    })
                }
			});
			} else {
				alert("لا يمكن تحميل الأداة لأن خادم BinLoader مشغول");//<<If server is busy, alert message.
				return;
		  }
	  };
  }

//--------------------------------------------------

//------Payloads--------

// Load Payloads with exploit

function Loadpayloadonline(PLfile) {
    window.payload_path = PLfile;
    // If we have access to toogle_payload from lapse.js, use it
    if (typeof window.toogle_payload === 'function') {
        window.toogle_payload(PLfile);
    } else {
        console.log('Payload set for loading after exploit: ' + PLfile);
    }
}

// PSFree Fix

function load_PSFreeFix(){
    const Confirmation = confirm("هل أنت متأكد من رغبتك في تحميل أداة إصلاح PSFree؟");
    if (Confirmation) {
        // First try local loading through GoldHen
        Loadpayloadlocal("./payloads/ps4-psfree-fix.bin");
        
        // Also show loading message
        if (document.getElementById('log')) {
            awaitpl();
            LoadedMSG = "تم تحميل أداة إصلاح PSFree!";
        }
    }
}

// App2USB - Transfer Apps to USB
function load_app2usb(){
    const Confirmation = confirm("تحميل أداة App2USB؟ هذه الأداة تسمح بنقل التطبيقات إلى وحدة تخزين USB.");
    if (Confirmation) {
        Loadpayloadlocal("./payloads/app2usb.bin");
        if (document.getElementById('log')) {
            awaitpl();
            LoadedMSG = "تم تحميل أداة App2USB!";
        }
    }
}

// AppCache Install
function load_appcache_install(){
    const Confirmation = confirm("تحميل أداة تثبيت التخزين المؤقت (AppCache Install)؟");
    if (Confirmation) {
        Loadpayloadlocal("./payloads/appcache-install.bin");
        if (document.getElementById('log')) {
            awaitpl();
            LoadedMSG = "تم تحميل أداة تثبيت التخزين المؤقت (AppCache Install)!";
        }
    }
}

// Backup
function load_backup(){
    const Confirmation = confirm("تحميل أداة النسخ الاحتياطي (Backup)؟ هذه الأداة ستقوم بنسخ بيانات نظامك احتياطيًا.");
    if (Confirmation) {
        Loadpayloadlocal("./payloads/backup.bin");
        if (document.getElementById('log')) {
            awaitpl();
            LoadedMSG = "تم تحميل أداة النسخ الاحتياطي (Backup)!";
        }
    }
}

// Disable Updates
function load_disable_updates(){
    const Confirmation = confirm("تحميل أداة تعطيل التحديثات؟ هذه الأداة ستحظر تحديثات النظام.");
    if (Confirmation) {
        Loadpayloadlocal("./payloads/disable-updates.bin");
        if (document.getElementById('log')) {
            awaitpl();
            LoadedMSG = "تم تحميل أداة تعطيل التحديثات!";
        }
    }
}

// Enable Updates
function load_enable_updates(){
    const Confirmation = confirm("تحميل أداة تمكين التحديثات؟ هذه الأداة ستسمح بتحديثات النظام.");
    if (Confirmation) {
        Loadpayloadlocal("./payloads/enable-updates.bin");
        if (document.getElementById('log')) {
            awaitpl();
            LoadedMSG = "تم تحميل أداة تمكين التحديثات!";
        }
    }
}

// FTP Server
function load_ftp(){
    const Confirmation = confirm("تحميل أداة خادم FTP؟ هذه الأداة ستبدأ خادم FTP على جهاز PS4 الخاص بك.");
    if (Confirmation) {
        Loadpayloadlocal("./payloads/ftp.bin");
        if (document.getElementById('log')) {
            awaitpl();
            LoadedMSG = "تم تحميل أداة خادم FTP!";
        }
    }
}

// History Blocker
function load_history_blocker(){
    const Confirmation = confirm("تحميل أداة حظر السجل (History Blocker)؟ هذه الأداة ستحظر تتبع سجل المتصفح.");
    if (Confirmation) {
        Loadpayloadlocal("./payloads/history-blocker.bin");
        if (document.getElementById('log')) {
            awaitpl();
            LoadedMSG = "تم تحميل أداة حظر السجل (History Blocker)!";
        }
    }
}

// PS4 Debug
function load_ps4debug(){
    const Confirmation = confirm("تحميل أداة PS4Debug؟ هذه الأداة تُمكّن ميزات تصحيح الأخطاء.");
    if (Confirmation) {
        Loadpayloadlocal("./payloads/ps4debug.bin");
        if (document.getElementById('log')) {
            awaitpl();
            LoadedMSG = "تم تحميل أداة PS4Debug!";
        }
    }
}

// PUP Decrypt
function load_pup_decrypt(){
    const Confirmation = confirm("تحميل أداة فك تشفير PUP؟ هذه الأداة تسمح بفك تشفير ملفات تحديث PS4.");
    if (Confirmation) {
        Loadpayloadlocal("./payloads/pup-decrypt.bin");
        if (document.getElementById('log')) {
            awaitpl();
            LoadedMSG = "تم تحميل أداة فك تشفير PUP!";
        }
    }
}

// Restore
function load_restore(){
    const Confirmation = confirm("تحميل أداة الاستعادة (Restore)؟ هذه الأداة ستقوم باستعادة بيانات نظامك.");
    if (Confirmation) {
        Loadpayloadlocal("./payloads/restore.bin");
        if (document.getElementById('log')) {
            awaitpl();
            LoadedMSG = "تم تحميل أداة الاستعادة (Restore)!";
        }
    }
}

// RIF Renamer
function load_rif_renamer(){
    const Confirmation = confirm("تحميل أداة إعادة تسمية RIF؟ هذه الأداة تدير ملفات الترخيص.");
    if (Confirmation) {
        Loadpayloadlocal("./payloads/rif-renamer.bin");
        if (document.getElementById('log')) {
            awaitpl();
            LoadedMSG = "تم تحميل أداة إعادة تسمية RIF!";
        }
    }
}

// WebRTE
function load_webrte(){
    const Confirmation = confirm("تحميل أداة WebRTE؟ هذه الأداة تُمكّن ميزات التحرير في الوقت الفعلي.");
    if (Confirmation) {
        Loadpayloadlocal("./payloads/WebRTE_900.bin");
        if (document.getElementById('log')) {
            awaitpl();
            LoadedMSG = "تم تحميل أداة WebRTE!";
        }
    }
}

// Make all functions globally available
window.load_PSFreeFix = load_PSFreeFix;
window.load_app2usb = load_app2usb;
window.load_appcache_install = load_appcache_install;
window.load_backup = load_backup;
window.load_disable_updates = load_disable_updates;
window.load_enable_updates = load_enable_updates;
window.load_ftp = load_ftp;
window.load_history_blocker = load_history_blocker;
window.load_ps4debug = load_ps4debug;
window.load_pup_decrypt = load_pup_decrypt;
window.load_restore = load_restore;
window.load_rif_renamer = load_rif_renamer;
window.load_webrte = load_webrte;
