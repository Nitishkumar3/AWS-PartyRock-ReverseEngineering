        $(document).ready(function() {
            $('#theme-toggle').click(function() {
                if ($('html').hasClass('dark')) {
                    $('html').removeClass('dark');
                    localStorage.setItem('theme', 'light');
                } else {
                    $('html').addClass('dark');
                    localStorage.setItem('theme', 'dark');
                }
            });
            
            if (localStorage.getItem('theme') === 'dark' || 
                (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                $('html').addClass('dark');
            } else {
                $('html').removeClass('dark');
            }
            
            const aspectRatios = {
                'Landscape': ['16:9', '3:2', '4:3', '5:4'],
                'Square': ['1:1'],
                'Portrait': ['9:16', '2:3', '3:4', '4:5']
            };
            
            function updateAspectRatios() {
                const orientation = $('#orientation').val();
                const ratios = aspectRatios[orientation] || [];
                
                const aspectRatioSelect = $('#aspectratio');
                aspectRatioSelect.empty();
                
                ratios.forEach(function(ratio) {
                    aspectRatioSelect.append($('<option></option>').val(ratio).text(ratio));
                });
            }
            
            updateAspectRatios();
            
            $('#orientation').change(updateAspectRatios);
            
            $('#download-btn').click(function() {
                const imgSrc = $('#result-image').attr('src');
                const link = document.createElement('a');
                link.href = imgSrc;
                link.download = 'generated-image.png';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
            
            $('#generator-form').submit(function(e) {
                e.preventDefault();
                
                const generateBtn = $('#generate-btn');
                generateBtn.prop('disabled', true);
                generateBtn.html('<svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Generating...');
                
                $('#error-message').addClass('hidden').text('');
                $('#result-container').addClass('hidden');
                
                $.ajax({
                    url: '/generate',
                    type: 'POST',
                    data: $(this).serialize(),
                    dataType: 'json',
                    success: function(response) {
                        generateBtn.prop('disabled', false);
                        generateBtn.html('Generate');
                        
                        $('#result-container').removeClass('hidden');
                        
                        if (response.isSuccess) {
                            $('#result-image').attr('src', 'data:image/png;base64,' + response.data);
                            $('#result-image').removeClass('hidden');
                            $('#download-btn').removeClass('hidden');
                        } else {
                            $('#error-message').removeClass('hidden').text('Error: ' + response.data);
                            $('#result-image').addClass('hidden');
                            $('#download-btn').addClass('hidden');
                        }
                    },
                    error: function(xhr, status, error) {
                        generateBtn.prop('disabled', false);
                        generateBtn.html('Generate');
                        
                        $('#result-container').removeClass('hidden');
                        $('#error-message').removeClass('hidden').text('Server error occurred. Please try again.');
                        $('#result-image').addClass('hidden');
                        $('#download-btn').addClass('hidden');
                    }
                });
            });
        });
