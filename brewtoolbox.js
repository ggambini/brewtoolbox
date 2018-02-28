			function getSG(gravity,unit) {
                                gravity = parseFloat(gravity);
                                var result;
                                if(unit == "sg") {
                                        if(gravity > 500 && gravity < 2000) {
                                                gravity = gravity / 1000;
                                        }
                                        else if(gravity < 2 && gravity > 0) {
                                                gravity = gravity;
                                        }
                                        else {
                                                gravity = 1;
                                                alert('Syntax SG : [500-2000] OR [0.5-2.0]');
                                        }
                                        result = gravity;
                                }
                                else if(unit == "plato") {
                                        result = 1 + (gravity / (258.6 - 0.88 * gravity));
                                }
                                else if(unit == "brix") {
                                        gravity = 1.03 * gravity;
                                        result = 1 + (gravity / (258.6 - 0.88 * gravity));
                                }
                                return result;
                        }

			function getPlato(gravity,unit) {
                                gravity = parseFloat(gravity);
                                var result;
                                if(unit == "sg") {
                                        if(gravity > 500 && gravity < 1500) {
                                                gravity = gravity / 1000;
                                        }
                                        else if(gravity < 2 && gravity > 0) {
                                                gravity = gravity;
                                        }
                                        else {
                                                gravity = 1;
                                                alert('getSG: ?');
                                        }
                                        result = (258.6 * (gravity - 1)) / (0.12 + 0.88 * gravity);
                                }
                                else if(unit == "plato") {
                                        result = gravity;
                                }
                                else if(unit == "brix") {
                                        result = 1.03 * gravity;
                                }
                                return result;
                        }

			function getBrix(gravity,unit) {
                                gravity = parseFloat(gravity);
                                var result;
                                if(unit == "sg") {
                                        if(gravity > 500 && gravity < 1500) {
                                                gravity = gravity / 1000;
                                        }
                                        else if(gravity < 2 && gravity > 0) {
                                                gravity = gravity;
                                        }
                                        else {
                                                gravity = 1;
                                                alert('getSG: ?');
                                        }
                                        result = ((258.6 * (gravity - 1)) / (0.12 + 0.88 * gravity)) / 1.03;
                                }
                                else if(unit == "plato") {
                                        result = gravity / 1.03;
                                }
                                else if(unit == "brix") {
                                        result = gravity;
                                }
                                return result;
                        }

			function getBrix(gravity,unit) {
                                gravity = parseFloat(gravity);
                                var result;
                                if(unit == "sg") {
                                        if(gravity > 500 && gravity < 1500) {
                                                gravity = gravity / 1000;
                                        }
                                        else if(gravity < 2 && gravity > 0) {
                                                gravity = gravity;
                                        }
                                        else {
                                                gravity = 1;
                                                alert('getSG: ?');
                                        }
                                        result = ((258.6 * (gravity - 1)) / (0.12 + 0.88 * gravity)) / 1.03;
                                }
                                else if(unit == "plato") {
                                        result = gravity / 1.03;
                                }
                                else if(unit == "brix") {
                                        result = gravity;
                                }
                                return result;
                        }

			function multiGravity() {
                        	var convertGravity = document.convertGravity.convertGravity.value;
				var convertUnit = document.convertGravity.convertUnit.value;
				var convertTemp = document.convertGravity.convertTemp.value;
				var adjustTemp = '20.0';
				document.getElementById('convertSG').innerHTML = getSG(convertGravity,convertUnit).toFixed(3);
				document.getElementById('convertPlato').innerHTML = getPlato(convertGravity,convertUnit).toFixed(2);
				document.getElementById('convertBrix').innerHTML = getBrix(convertGravity,convertUnit).toFixed(2);
				document.getElementById('convertTemp').innerHTML = document.convertGravity.convertTemp.value;
				
				var diffTemp = convertTemp - adjustTemp;
				var correction = ((0.00352871 * diffTemp * diffTemp) + (0.225225 * diffTemp)) /1000;
				var adjustedSG = correction + getSG(convertGravity,convertUnit);
		
				document.getElementById('adjustedSG').innerHTML = adjustedSG.toFixed(3); 
				document.getElementById('adjustedPlato').innerHTML = getPlato(adjustedSG, 'sg').toFixed(2);
				document.getElementById('adjustedBrix').innerHTML = getBrix(adjustedSG, 'sg').toFixed(2);
				document.getElementById('adjustTemp').innerHTML = adjustTemp;
                        }

			function apparentAttenuation() {
                                var initialGravity = document.attenuation.initialGravity.value;
                                var initialUnit = document.attenuation.initialUnit.value;
                                var currentGravity = document.attenuation.currentGravity.value;
                                var currentUnit = document.attenuation.currentUnit.value;

                                initialGravity = getSG(initialGravity,initialUnit);
                                currentGravity = getSG(currentGravity,currentUnit);

                                var appAttenuation = (initialGravity - currentGravity) / (initialGravity - 1) * 100;
                                appAttenuation = appAttenuation.toFixed(2);
                                document.getElementById('apparentAttenuation').innerHTML = appAttenuation + "%";

                                var appAlcool = ((initialGravity - currentGravity) / 7.5) * 1000;
                                appAlcool = appAlcool.toFixed(2);
                                document.getElementById('alcool').innerHTML = appAlcool + "%";
                        }

			function decoctionTrempe() {
                                var decoctionVolume = document.decoction.decoctionVolume.value;
                                var decoctionInitial = document.decoction.decoctionInitial.value;
                                var decoctionCible = document.decoction.decoctionCible.value; 
                                var decoctionRetour = '100.0'

                                decoctionRatio = (decoctionCible - decoctionInitial) / (decoctionRetour - decoctionInitial);
                                decoctionTrempeVolume = decoctionVolume * decoctionRatio;

                                document.getElementById('decoctionTrempeVolume').innerHTML = decoctionTrempeVolume.toFixed(1) + "L";
                                document.getElementById('decoctionRatio').innerHTML = ((decoctionRatio * 100).toFixed(1)) + "%";
                        }

			function bavarianHopping() {
                                var bavarianVolume = document.bavarianHop.bavarianVolume.value;
                                var bavarianAlpha = document.bavarianHop.bavarianAlpha.value;
                                var bavarianIBU = document.bavarianHop.bavarianIBU.value;
                                var bavarianRatio = document.bavarianHop.bavarianRatio.value;

                                var totalIBU = bavarianIBU * bavarianVolume;
                                var totalHop = totalIBU / ((bavarianAlpha / 100) * bavarianRatio * 1000);
                                var fwhHop = bavarianRatio * totalHop;
                                var boilHop = (1 - bavarianRatio) * totalHop;

                                document.getElementById('bavarianFWH').innerHTML = fwhHop.toFixed(0) + "g";
                                document.getElementById('bavarianBoil').innerHTML = boilHop.toFixed(0) + "g";
                        }

			function firstInfusion() {
				var maltInfu = document.infusion.maltInfu.value;
				var ratioInfu = document.infusion.ratioInfu.value;
				var targetInfu = document.infusion.targetInfu.value;
				var baseTemp = document.infusion.baseTemp.value;
		
				var volumeInfu = ratioInfu * maltInfu;
				var initialInfu = (maltInfu * 1610 * (baseTemp - targetInfu)) / (volumeInfu * 4185);
				var tempInfu = targetInfu - initialInfu;
				var volumeMaische = maltInfu * 1.65 + volumeInfu;
	
				document.getElementById('volumeInfu').innerHTML = volumeInfu.toFixed(1) + "L";
				document.getElementById('tempInfu').innerHTML = tempInfu.toFixed(1) + "°C";
				document.getElementById('volumeMaische').innerHTML = volumeMaische.toFixed(1) + "L";
			}
