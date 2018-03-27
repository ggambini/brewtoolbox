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
				var primingSugar = document.attenuation.primingSugar.value

                                initialGravity = getSG(initialGravity,initialUnit);
                                currentGravity = getSG(currentGravity,currentUnit);

                                var appAttenuation = (initialGravity - currentGravity) / (initialGravity - 1) * 100;
                                appAttenuation = appAttenuation.toFixed(2);
                                document.getElementById('apparentAttenuation').innerHTML = appAttenuation + "%";

				// Formule simple de calcul - Adapte aux taux < 6%
                                var percentAlcool1 = ((initialGravity - currentGravity) / 7.642) * 1000;
                                stringAlcool1 = percentAlcool1.toFixed(2);
				// Formule 2 de calcul - Adapte aux taux > 6%
				var percentAlcool2 = (76.08 * (initialGravity - currentGravity) / (1.775 - initialGravity)) * (currentGravity / 0.794)
				stringAlcool2 = percentAlcool2.toFixed(2);
                                document.getElementById('alcool').innerHTML = stringAlcool1 + " - " + stringAlcool2 + "%";

				// Formule calcul resucrage - sucre en gramme x taux fermentiscibilité 
				var primingSugarAlcool = (primingSugar * 0.5114) / 7.95;
				stringAlcool1 = percentAlcool1 + primingSugarAlcool;
				stringAlcool1 = stringAlcool1.toFixed(2);
				stringAlcool2 = percentAlcool2 + primingSugarAlcool;
				stringAlcool2 = stringAlcool2.toFixed(2);
				document.getElementById('primingSugarAlcool').innerHTML = stringAlcool1 + " - " + stringAlcool2 + "%";

                        }

			function decoctionTrempe() {
                                var decoctionVolume = document.decoction.decoctionVolume.value;
                                var decoctionInitial = document.decoction.decoctionInitial.value;
                                var decoctionCible = document.decoction.decoctionCible.value; 
                                var decoctionRetour = '100.0'

                                var decoctionRatio = (decoctionCible - decoctionInitial) / (decoctionRetour - decoctionInitial);
                                var decoctionTrempeVolume = decoctionVolume * decoctionRatio;
				var mashtunNewVolume = decoctionVolume - decoctionTrempeVolume;

                                document.getElementById('decoctionTrempeVolume').innerHTML = decoctionTrempeVolume.toFixed(1) + "L";
                                document.getElementById('decoctionRatio').innerHTML = ((decoctionRatio * 100).toFixed(1)) + "%";
				document.getElementById('mashtunNewVolume').innerHTML = mashtunNewVolume.toFixed(1) + "L";
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
				// Volume malt 1.65L/kg - Retention malt 1L/kg donne 0.65
				var volumeMaische = maltInfu * 0.65 + volumeInfu;
	
				document.getElementById('volumeInfu').innerHTML = volumeInfu.toFixed(1) + "L";
				document.getElementById('tempInfu').innerHTML = tempInfu.toFixed(1) + "°C";
				document.getElementById('volumeMaische').innerHTML = volumeMaische.toFixed(1) + "L";
			}
