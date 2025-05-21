

// 全局变量 

 //  全局变量 -- Row1  - 7个
	let   SwitchToDayDue  = "" ;          // 01 - 今天到期的 due = 今天 	
	let   SwitchOverDue  =  "" ;          // 02 - 已经超期  due < 今天 的  

	let   SwitchHaveDue = "" ;          // 03 -- 有due ，有截止
	let   SwitchHaveScheduled = "" ;    // 04 -- 有安排，有Scheduled
	
	let   SwitchDone  = "" ;              // 05 - 已完成  全部 done的 
	let   SwitchProjectfullyCompleted = "" ;       // 06--  项目彻底完成

	let   SwitchMonthNotDone = "";         //07 - 本月未完成  

 //  全局变量 -- Row2   - 6个
	let  WaitingDayNumber = 7;              // 01 --  待办清单 ： 自己控制节奏  
	let  SwitchWaitingToDoList = "" ;
	let  SwitchGoleNotDone  = "";       // 02 --  有规划 | 但未完成 
	
	let  SwitchNotDone = "true" ; 	 	    // 03 -- 有规划 \ 未完成 
	let  SwitchRecurring  = "";         // 04 -- 未完成的循环任务	
	
	let  SwitchAnOther  = "" ;           // 05 - 意外情况； AnOtherFilter
	let  SwitchProjectPartCompleted  = "";         //  06 --  项目部分完成 

	let  SwitchWeekNotDone  = "";        // 07 本周未完成   

 //  全局变量 -- Row3 -- 时间容器   	
 
	let  ContainerStartDateValue = "";       // 这个是下拉框的那个起始时间 ，点选后自动同步   
	let  ContainerEndDateValue = "";          // 这个是下拉框的那个结束时间 ，点选后自动同步  
	let  ContainerMonthDateValue = "";         //  这个是月的 表单的选择的  年与月
	let  ContainerWeekDateValue = "";         //  这个是月的 表单的选择的  周；	
	
 //  全局变量 -- Row4 --  时间 -- 中文搜索 
	let  DateSearch = "";           // 中文日期搜索限定的
	let  Intervalday = ""  ;        // 时间块限定的的 ；

 //  全局变量 -- Row5 --  text | tags | section | fileName | path 搜索 
	let   TextSearch = ""  ;          // 01 -- 就是task的那个文本 
	let   TagsSearch = "" ;          // 02 -- 就是task的那个文本 
	let   HeadSectionSearch  = "" ;  // 03 -- 就是task的那个文本 
	let   FileNameSearch = "" ;    // 04 -- 就是task的那个文本 
	let   PathSearch  = "" ;          // 这个暂时不用哈，感觉 不太用得着 ，但是放这儿 
 
 // 全局变量 --  Row6  --  排序参数  
	let StringSortOption = '';  // 第一组排序的key [最好是文本类：FileName，OnlyHead， text]
	let StringSortOrder = 'desc';  // 第一组排序的顺序
	
	let DateSortOption = '';  // 第二组排序的key   [最好是时间类：due  scheduled  completion]
	let DateSortOrder = 'desc';  // 第二组排序的顺序
	
	let SwitchGroup = "false";     // 控制任务是否按所在的Page展示？；false不展示； 

 // 筛选按钮样式儿 -- 按钮变量名，方便按钮样式儿的哈
    let buttonClassName = "btn-04";



// 重要的辅助函数 
    // 01 - 动态日期函数包  -- 返回动态的 18个变量（今年去年明年|本月下月|上月~月初月末） 不用动的
	
	    function DateFilterPackage() {
		    // 01- 定义格式化日期为 yyyy-MM-dd 字符串的函数
		            function formatDate(date) {
		            const year = date.getFullYear();
		            const month = (date.getMonth() + 1).toString().padStart(2, '0');
		            const day = date.getDate().toString().padStart(2, '0');
		            return `${year}-${month}-${day}`;
		            }
		    
		        const currentDate = new Date();                       // 获取当前日期
		        const currentYear = currentDate.getFullYear();        // 获取当前年份和月份
		        const currentMonth = currentDate.getMonth();          // 0-11 代表1月到12月
		 
		    // 02 - 补充的周的计算的函数  3个，是计算周的范围，动态的； 6个时间，一周的起与始，本周，上周，下一周
		       // 01 --  计算本周的开始和结束日期
				 	  function getWeekRange(date) {
				 	      const currentDate = new Date(date);
				 	      const firstDay = currentDate.getDate() - currentDate.getDay(); // 获取本周的第一天（周日）
				 	      const lastDay = firstDay + 6; // 获取本周的最后一天（周六）
				 	  
				 	      const startOfWeek = new Date(currentDate.setDate(firstDay));
				 	      const endOfWeek = new Date(currentDate.setDate(lastDay));
				 	  
				 	      return {
				 	          startOfWeek: formatDate(startOfWeek),
				 	          endOfWeek: formatDate(endOfWeek)
				 	      };
				 	      }
		        
			   // 02  --  计算上一周的开始和结束日期
				function getPreviousWeekRange(date) {
					const currentDate = new Date(date);
					currentDate.setDate(currentDate.getDate() - 7); // 获取上周的同一天
					return getWeekRange(currentDate);
					}
			 
			   // 03  --  计算下一周的开始和结束日期
					  function getNextWeekRange(date) {
						  const currentDate = new Date(date);
						  currentDate.setDate(currentDate.getDate() + 7); // 获取下周的同一天
						  return getWeekRange(currentDate);
						  }
		 
		    // 容错处理  -- 当1月时，判断上一个月有坑； 本质上，上个月的运算是通过  0~11 ±1来的，如果1月，0--1=-1 ，得不到12的哈，得处理 
		        let previousMonthYear = currentYear;
		        let previousMonth = currentMonth - 1;
		        if (currentMonth === 0) {  // 当前月份为 1 月时
		            previousMonthYear = currentYear - 1;
		            previousMonth = 11; // 12 月
		            }
		    
		    // 容错处理 - 12月时，判断下一个月有坑； 本质上是因为这个计算下一个用，用的是   0~11 ±1； 跨年的话没办法再 - 下去了 
		        let nextMonthYear = currentYear;
		        let nextMonth = currentMonth + 1;
		        if (currentMonth === 11) {  // 当前月份为 12 月时
		            nextMonthYear = currentYear + 1;
		            nextMonth = 0; // 1 月
		            }
		    
		    // 先组装-年初-年末  ~ 动态的
		        const startofYear = new Date(new Date().getFullYear(), 0, 1)
		        const endofYear = new Date(new Date().getFullYear(), 11, 31)
		    
		    
		        const LaststartofYear = new Date(new Date().getFullYear()-1, 0, 1)      // 去年  --- 年初  | 年末 
		        const LastendofYear = new Date(new Date().getFullYear()-1, 11, 31)
		        const FuturestartofYear = new Date(new Date().getFullYear()+1, 0, 1)     // 明年  ---  年初 \ 年末 
		        const FutureendofYear = new Date(new Date().getFullYear()+1, 11, 31)
		    
		       // 组装-本月 - 月初-月末  ~ 动态的
		        const startOfMonth = new Date(currentYear, currentMonth, 1);      //  本月  -- 月初 |  月末 
		        const endOfMonth = new Date(currentYear, currentMonth + 1, 0);    
		        const LaststartOfMonth = new Date(previousMonthYear, previousMonth, 1);   // 上个月，月初 | 月末 
		        const LastendOfMonth = new Date(currentYear, currentMonth, 0);        
		        const NextstartOfMonth = new Date(nextMonthYear, nextMonth, 1);         //下个月，月初 \ 月末 
		        const NextendOfMonth = new Date(nextMonthYear, nextMonth + 1, 0);
		 
		    // 转换 - 动态的 - 本年年初 \ 本月年末
		        const FloatYearStart = formatDate(startofYear);   // 格式化日期   --今年
		        const FloatYearEnd = formatDate(endofYear);       // 格式化日期
		        const FloatLastYearStart = formatDate(LaststartofYear);   // 格式化日期   --- 去年
		        const FloatLastYearEnd = formatDate(LastendofYear);       // 格式化日期
		        const FloatFutureYearStart = formatDate(FuturestartofYear);   // 格式化日期   --明年
		        const FloatFutureYearEnd = formatDate(FutureendofYear);       // 格式化日期
		        
		    // 转换 -动态的 - 本月月初 \ 本月月末
		        const FloatMonthStart = formatDate(startOfMonth);   // 格式化日期 -- 本月 
		        const FloatMonthEnd = formatDate(endOfMonth);       // 格式化日期
		        const FloatLastMonthStart = formatDate(LaststartOfMonth);     // 格式化日期 -- 上月 
		        const FloatLastMonthEnd = formatDate(LastendOfMonth);     
		        const FloatNextMonthStart = formatDate(NextstartOfMonth);  
		        const FloatNextMonthEnd = formatDate(NextendOfMonth);    
		    
		    // 拆解 → 得到单独的 数字部分，    去年 | 今年 | 明年 ；   本月 |上月| 下月
		        let   LastYearNumber  = FloatLastYearStart.split('-')[0];
		        let   CurrentYearNumber=  FloatYearStart.split('-')[0];
		        let   FutureYearNumber=  FloatFutureYearStart.split('-')[0];
		        
		        let   LastMonthNumber  =  FloatLastMonthStart.split('-')[1];
		        let   CurrentMonthNumber =  FloatMonthStart.split('-')[1];
		        let   NextMonthNumber =  FloatNextMonthStart.split('-')[1];
		 
		    // 补充  -- 前天 \ 昨天   \  明天  \ 后天        动态的；  
				  	const dayBeforeYesterday = new Date(currentDate);
				  	dayBeforeYesterday.setDate(currentDate.getDate() - 2);
				  	const FloatDayBeforeYesterday = formatDate(dayBeforeYesterday);
				  	
				  	const yesterday = new Date(currentDate);
				  	yesterday.setDate(currentDate.getDate() - 1);
				  	const FloatYesterday = formatDate(yesterday);
				  	
				  	const tomorrow = new Date(currentDate);
				  	tomorrow.setDate(currentDate.getDate() + 1);
				  	const FloatTomorrow = formatDate(tomorrow);
				  	
				  	const dayAfterTomorrow = new Date(currentDate);
				  	dayAfterTomorrow.setDate(currentDate.getDate() + 2);
				  	const FloatDayAfterTomorrow = formatDate(dayAfterTomorrow);
				  	
				  	const CurrentDayNumber = String(currentDate.getDate());    // 今天的日期  的号数，比如  01  25 
				  	
				  	const FloatToday = formatDate(currentDate);    // 动态当天的 yyyy-mm-dd 也常用 ，也取了吧  
		 
		    // 补充 -- 前年  \ 后年   
		 
				  	const yearBeforeLast = currentDate.getFullYear() - 2;
				  	const FloatYearBeforeLast = String(yearBeforeLast);
				  
				  	// 后年
				  	const yearAfterNext = currentDate.getFullYear() + 2;
				  	const FloatYearAfterNext = String(yearAfterNext);
		 
		 	// 补充的 -- 本周 | 上周 | 下一周  （开始 + 结束 ） （共6个时间）
				 		const currentWeek = getWeekRange(currentDate);           // 这个是第一步，只是得到的2个时间  起与始在一起，还要再拆
				 	    const previousWeek = getPreviousWeekRange(currentDate);  
				 	    const nextWeek = getNextWeekRange(currentDate);
				 
				    // 解析上一周的完整日期
				 	    let FloatLastWeekFullyDateStart = previousWeek.startOfWeek;
				 	    let FloatLastWeekFullyDateEnd = previousWeek.endOfWeek;
				 	  
				 	  // 解析本周的完整日期
				 	    let CurrentWeekFullyDateStart = currentWeek.startOfWeek;
				 	    let CurrentWeekFullyDateEnd = currentWeek.endOfWeek;
				 	  
				 	  // 解析下一周的完整日期
				 	     let FloatNextWeekFullyDateStart = nextWeek.startOfWeek;
				 	     let FloatNextWeekFullyDateEnd = nextWeek.endOfWeek;
		  
		 
		    // 上面一顿操作，就是计算出了18个变量   动态的变量      
		            //   FloatYearStart,            FloatYearEnd              动态的；  本年年初、 年末
		            //   FloatLastYearStart,     FloatLastYearEnd,        动态的；  去年年初、 年末
		            //   FloatFutureYearStart,  FloatFutureYearEnd,   动态的；  明年初、 年末
		    
		            //   FloatMonthStart,       FloatMonthEnd,          动态的；  本月月初，月末 
		            //   FloatLastMonthStart, FloatLastMonthEnd,    动态的；  上个月月初，月末  （要解决跨年时的1月问题）
		            //   FloatNextMonthStart, FloatNextMonthEnd,     动态的； 下个月月初，月末（要解决跨年时的12月问题）
		            //   FloatDayBeforeYesterday, FloatYesterday, FloatTomorrow, FloatDayAfterTomorrow,   动态的 - 前天，昨天，明天，后天
		    
		        return {FloatYearStart,FloatYearEnd,
		                FloatLastYearStart, FloatLastYearEnd,
		                FloatFutureYearStart,  FloatFutureYearEnd,
		                FloatMonthStart,       FloatMonthEnd,   
		                FloatLastMonthStart, FloatLastMonthEnd,
		                FloatNextMonthStart, FloatNextMonthEnd,
		                LastYearNumber, CurrentYearNumber, FutureYearNumber,
		                LastMonthNumber, CurrentMonthNumber ,NextMonthNumber ,
		                FloatDayBeforeYesterday, FloatYesterday, FloatTomorrow, FloatDayAfterTomorrow, // 前天 \ 昨天   \  明天  \ 后天   
		                FloatToday,      // 动态的当天 yyyy-mm-dd日期 
		                CurrentDayNumber,    // 今天的number号  
		        		FloatYearBeforeLast,FloatYearAfterNext,  // 前年 ，后年 
		        		FloatLastWeekFullyDateStart,FloatLastWeekFullyDateEnd,   // 上一周周一、周末 
		          		CurrentWeekFullyDateStart,  CurrentWeekFullyDateEnd ,    // 本周周一、周末 
		          		FloatNextWeekFullyDateStart  ,FloatNextWeekFullyDateEnd, // 下一周，周一、周末
		        		
		                
		                };
		        }
		 
	 
    // 02 - 中文日期搜索string处理函数    
	   // " 上年 去年，明年， 下一年 上月 上个月 下月 下个月 今年 今天";
	   // " 2022  2021  2023  2024   5月  7月   1号  10~15日  " 
	   // " 2024-05-06  2025-08-09  "
	   // 前天，昨天  | 明天   | 后天 \  今天   \ 当天  | 今日      
			   
		function ChineseSwitch(DateSearch) {
			// 01 - 准备3个空数组 ，存最后处理好的结果
			 // 大白话，就是把日期 ，分拆为 年，月，日，后期，我们去精确匹配哈；  
				let ArrayOneYear = [];
				let ArrayOneMonth = [];
				let ArrayDay = [];
		
			// 02 - 动态日期函数包返回值解析  （动态的，本年，下一年，上一年；本月月初，月末 ，年初，年末....）
				let { FloatYearStart,FloatYearEnd,
				   FloatLastYearStart, FloatLastYearEnd,
				   FloatFutureYearStart,  FloatFutureYearEnd,
				   FloatMonthStart,       FloatMonthEnd,   
				   FloatLastMonthStart, FloatLastMonthEnd,
				   FloatNextMonthStart, FloatNextMonthEnd,
				   LastYearNumber, CurrentYearNumber, FutureYearNumber,
				   LastMonthNumber, CurrentMonthNumber ,NextMonthNumber,    
				   FloatDayBeforeYesterday, FloatYesterday, FloatTomorrow, FloatDayAfterTomorrow,  
				   FloatToday,       // 动态的当天 yyyy-mm-dd日期       
				   CurrentDayNumber,    // 今天的number号				   
				   FloatYearBeforeLast,FloatYearAfterNext,  // 前年 ，后年 
				   FloatLastWeekFullyDateStart,FloatLastWeekFullyDateEnd,   // 上一周周一、周末 
       			   CurrentWeekFullyDateStart,  CurrentWeekFullyDateEnd ,    // 本周周一、周末 
       			   FloatNextWeekFullyDateStart  ,FloatNextWeekFullyDateEnd, // 下一周，周一、周末
					} = DateFilterPackage();      // 解析数据 ，就是之前的那些返回值
		
		    // 02.5 -- 解决动态的，年月日问题 
				//  " 上年 去年，明年， 下一年 上月 上个月 下月 下个月 今年 今天";   这些全解决了；  
			    // 定义替换规则
				    const replaceValues = {
				        '今年年初': FloatYearStart,
				        '今年年末': FloatYearEnd,
				        '前年': FloatYearBeforeLast,
				        '后年': FloatYearAfterNext,
				        '前天': FloatDayBeforeYesterday,
				        '昨天': FloatYesterday,
				        '明天': FloatTomorrow,
				        "今天": FloatToday,
				        "当天": FloatToday,
				        "今日": FloatToday,
				        '后天': FloatDayAfterTomorrow,
				        '年初': FloatYearStart, // 放在更具体的之后
				        '年末': FloatYearEnd,    // 放在更具体的之后				        
				        '年末': FloatYearEnd,    // 放在更具体的之后
				        
				    };
				
				    const replaceAndAddToArray = {
				        '今年|本年': CurrentYearNumber,
				        '上一年': LastYearNumber,
				        '去年': LastYearNumber,
				        '下一年': FutureYearNumber,
				        '明年': FutureYearNumber
				    };
				
				    const replaceAndAddToMonthArray = {
				        '这个月': CurrentMonthNumber,
				        '本月': CurrentMonthNumber,
				        '上个月': LastMonthNumber,
				        '上月': LastMonthNumber,
				        '下个月': NextMonthNumber,
				        '下月': NextMonthNumber
				    };
				
				    const replaceAndAddToDayArray = {
				        '今天|today': CurrentDayNumber
				    };
				
				    // 替换值
				    for (const [key, value] of Object.entries(replaceValues)) {
				        const regex = new RegExp(key, 'g');
				        DateSearch = DateSearch.replace(regex, value);
				    }
				
				    // 替换并加入 ArrayOneYear
				    for (const [key, value] of Object.entries(replaceAndAddToArray)) {
				        const regex = new RegExp(key, 'g');
				        if (regex.test(DateSearch)) {
				            ArrayOneYear.push(value);
				            DateSearch = DateSearch.replace(regex, '');
				        }
				    }
				
				    // 替换并加入 ArrayOneMonth
				    for (const [key, value] of Object.entries(replaceAndAddToMonthArray)) {
				        const regex = new RegExp(key, 'g');
				        if (regex.test(DateSearch)) {
				            ArrayOneMonth.push(value);
				            DateSearch = DateSearch.replace(regex, '');
				        }
				    }
				
				    // 替换并加入 ArrayDay
				    for (const [key, value] of Object.entries(replaceAndAddToDayArray)) {
				        const regex = new RegExp(key, 'g');
				        if (regex.test(DateSearch)) {
				            ArrayDay.push(value);
				            DateSearch = DateSearch.replace(regex, '');
				        }
				    }

			// 02.6 匹配   “每月” 和  “每个月”，
			  // 将 [01, 02, ..., 12] 加入 ArrayOneMonth，并将“每月”替换为空
				const everyMonthRegex = /每月|每个月/g;
				if (everyMonthRegex.test(DateSearch)) {
				    ArrayOneMonth.push(...['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']);
				    DateSearch = DateSearch.replace(everyMonthRegex, '');
					}
	
			// 03 -- 年月日 ~ 标准匹配  yyyy-mm-dd 日期，如2024-05-06 ;  2024.5.6
				DateSearch = DateSearch.replace(/[.]/g, '-0');      // 先把空上点给替换成-0，就变成了标准了的		
					
				let NormalMatches = DateSearch.match(/\b(\d{4})-(\d{2})-(\d{2})\b/g);
				    
				if (NormalMatches) {
				    NormalMatches.forEach(match => {
				       // 将匹配到的年、月、日加入数组
				       let [, year, month, day] = match.match(/^(\d{4})-(\d{2})-(\d{2})$/);
				       ArrayOneYear.push(year);
				       ArrayOneMonth.push(month);
				       ArrayDay.push(day);
				    });
				
				    // 替换匹配到的标准日期格式为空
				    DateSearch = DateSearch.replace(/\b(\d{4})-(\d{2})-(\d{2})\b/g, '');
				    }
		
				//  
				
			// 04 - 年份 -- 匹配  23年 24年  25年变成  2023  2024  2025  2026
		        // 定义正则表达式
		        let regexYear = /(\d{2})年/g;
		        let matchesYear = [];
		
		        // 收集所有匹配项
		        let matchYearValue;
		        while ((matchYearValue = regexYear.exec(DateSearch)) !== null) {
		            matchesYear.push(matchYearValue);
		        }
		
		           // 处理每个匹配项
		
		         matchesYear.forEach(match => {
		
		         let year = match[1];
		         let fullYear = "20" + year;  // 在前面加上 "20"
		        //dv.paragraph(`DateSearch - 年 - 处理之后 : ${fullYear}`);
		  
		  
		        let yearNumber = parseInt(fullYear, 10);
		        //dv.paragraph(`DateSearch - 年 - 处理之后 : ${yearNumber}`);
		
		        let tempArray = [];
		           // 检查是否在 1 到 31 范围内
		        tempArray.push(yearNumber);
		        tempArray = Array.from(new Set(tempArray)).sort((a, b) => a - b);   
		        ArrayOneYear = Array.from(new Set([...ArrayOneYear, ...tempArray]));   
		        DateSearch = DateSearch.replace(match[0], '').trim();
		
		        });
		
			// 05 - 年份 -- 匹配：  2021  2022  2023 ，这种光年份的  
			
				const OnlyNumberYearRegex = /\b\d{4}\b/g;   // 正则表达式匹配4位数字
				
				// 匹配到的年份
				let matchedYears = DateSearch.match(OnlyNumberYearRegex);
				
				if (matchedYears) {
				    // 将匹配到的年份添加到 ArrayOneYear 数组中
				    ArrayOneYear.push(...matchedYears);
				    
				    // 将匹配到的年份从 DateSearch 中移除
				    DateSearch = DateSearch.replace(OnlyNumberYearRegex, '').trim();
				}
		
		    // 06 - 月份处理 -- “一月  三月   1月  02月  ”  → 最终处理成：  01   02    12  ，这样的 mm形式  
		    
			   // 01 -- 定义中文替换成数组 函数  + 直接替换 ；   即   一月 | 二月， 换成数组的 1月  2月  12月    
			    function replaceChineseMonths(DateSearch) {
			       const chineseMonths = {
			       '一月': '1月',
			       '二月': '2月',
			       '三月': '3月',
			       '四月': '4月',
			       '五月': '5月',
			       '六月': '6月',
			       '七月': '7月',
			       '八月': '8月',
			       '九月': '9月',
			       '十月': '10月',
			       '十一月': '11月',
			       '十二月': '12月'
			         };
			
			        return DateSearch.replace(/(一月|二月|三月|四月|五月|六月|七月|八月|九月|十月|十一月|十二月)/g, match => chineseMonths[match]);
			         }
		
			    DateSearch = replaceChineseMonths(DateSearch);   // 直接用定义好的替换函数，把 中文的月替换成英语的月
		
			   // 02 -- 最终一起处理；即  要求你的月的形式是    '1月  7月   9月'   或者  "01月  02月  03月"形式的   
		
					let monthMatches = DateSearch.match(/\d{1,2}月/g);
					if (monthMatches) {
					    ArrayOneMonth = monthMatches.map(month => {
					        let num = month.replace('月', '').trim();
					        if (parseInt(num, 10) <= 12) {
					           return num.padStart(2, '0');
					            } else {
					            return null; // 忽略大于12的月份
					            }
					    }).filter(month => month !== null); // 过滤掉为 null 的项
					
					    DateSearch = DateSearch.replace(/\d{1,2}月/g, ''); // 替换为空
					
					    } else {
					   // 处理其他格式的月份
					    }
						
			// 07 - Day处理  --- 序列日期 ：  比如1~10号，  1-12号；  12-19号 , 批量加间隔 
				 // 如1~5号，那就是 ：  01  02  03  04 05 ； 生成 dd格式 的  
			        let regexinterval = /(\d{1,2})[-~](\d{1,2})[号日]/g;
			        let matchesinterval = [];
			
			        // 收集所有匹配项
			        let  matchvalue ; 
			        while ((matchvalue = regexinterval.exec(DateSearch)) !== null) {
			            matchesinterval.push(matchvalue);
			            }
			
			        // 处理每个匹配项
			        matchesinterval.forEach(match => {
			           let start = parseInt(match[1], 10);
			           let end = parseInt(match[2], 10);
			
			           // 排序从小到大
			           if (start > end) {
			               [start, end] = [end, start];
			           }
			
			           // 生成数字系列并加入到临时数组中
			           let tempArray = [];
			           for (let i = start; i <= end; i++) {
			               tempArray.push(i.toString().padStart(2, '0'));  // 保证是两位数格式
			                    }
			
			           // 将临时数组中的元素加入到 ArrayDay 中，并去重
			           ArrayDay = Array.from(new Set([...ArrayDay, ...tempArray]));
			
			           // 将匹配的部分替换为空字符串
			           DateSearch = DateSearch.replace(match[0], '').trim();
			           });
			
		    // 08 - 日期提取 -- 要求你的形式是  " 1号  9号，   9日  10日  "
		
					let dayMatches = DateSearch.match(/\d{1,2}(?:号|日)/g);
					if (dayMatches) {
					    ArrayDay = dayMatches.map(day => {
					       let num = day.replace('号', '').replace('日', '').trim();
					       let dayNumber = parseInt(num, 10);
					       if (dayNumber >= 1 && dayNumber <= 31) {
					            return dayNumber.toString().padStart(2, '0');
					        } else {
					            return null; // 不符合范围的日期返回 null
					        }
					    }).filter(day => day !== null); // 过滤掉不符合范围的日期
					    } else {
					    // 处理其他格式的日期
					    }


  			// 16 -- 关于周的处理 -- （把一周的day，肯定全加进到数组 day中去）  上周  | 本周 | 下周 
			
				// 解析日期字符串并生成一周的日期数组
					function generateWeekDays(startDate, daysArray, monthsArray, yearsArray) {
					 let start = new Date(startDate);
					 for (let i = 0; i < 7; i++) {
						 let current = new Date(start);
						 current.setDate(start.getDate() + i);
						 const year = current.getFullYear();
						 const month = (current.getMonth() + 1).toString().padStart(2, '0');
						 const day = current.getDate().toString().padStart(2, '0');
						 daysArray.push(day);
						 monthsArray.push(month);
						 yearsArray.push(year);
					 	}
						}
				
			
				// 处理"本周", "这一周", "此周", "这周"
					let regexCurrentWeek = /本周|这一周|此周|这周/g;
					if (regexCurrentWeek.test(DateSearch)) {
					    generateWeekDays(CurrentWeekFullyDateStart, ArrayDay, ArrayOneMonth, ArrayOneYear);
					    DateSearch = DateSearch.replace(regexCurrentWeek, '');
					}
				
				// 处理"上周", "上一周"
					let regexLastWeek = /上周|上一周/g;
					if (regexLastWeek.test(DateSearch)) {
					    generateWeekDays(FloatLastWeekFullyDateStart, ArrayDay, ArrayOneMonth, ArrayOneYear);
					    DateSearch = DateSearch.replace(regexLastWeek, '');
					}
				
				// 处理"下周", "下一周"
					let regexNextWeek = /下周|下一周/g;
					if (regexNextWeek.test(DateSearch)) {
					    generateWeekDays(FloatNextWeekFullyDateStart, ArrayDay, ArrayOneMonth, ArrayOneYear);
					    DateSearch = DateSearch.replace(regexNextWeek, '');
					}


			// 15 -- 00 --  年份 | 月份| 日期 ~ 最终处理 - 01 -- 准备衔准备3个组 
				let firstItems = {
				    year: ArrayOneYear[0],
				    month: ArrayOneMonth[0],
				    day: ArrayDay[0]
				    };
		
			// 15 -- 01  年份处理  --  （取1000~3000年间 | 排序 | 去重 ）
				ArrayOneYear = ArrayOneYear.filter(year => {
				    let yearNumber = parseInt(year, 10);
				    return yearNumber >= 1000 && yearNumber <= 3000;
				});
				
				ArrayOneYear = [...new Set(ArrayOneYear.map(year => parseInt(year, 10)))];    // 去重（有转成number了）
				ArrayOneYear.sort((a, b) => a - b); // 从小到大排序	
				ArrayOneYear = ArrayOneYear.map(year => year.toString());    // 转换回字符串类型
					
			// 15 -- 02  月处理  --  （取1~12月 | 排序 | 去重 ）（避免出现18月这样不标准的）
				ArrayOneMonth = ArrayOneMonth.filter(month => {
				    let monthNumber = parseInt(month, 10);
				    return monthNumber >= 1 && monthNumber <= 12;
				});
				
				ArrayOneMonth = [...new Set(ArrayOneMonth)].map(month => month.padStart(2, '0'));
				ArrayOneMonth.sort(); // 默认从小到大排序
			
			// 15 -- 03  Day处理  --  （取1~31号 | 排序 | 去重 ）（避免出现76号这样不标准的）
				ArrayDay = ArrayDay.filter(day => {
				    let dayNumber = parseInt(day, 10);
				    return dayNumber >= 1 && dayNumber <= 31;
				});
				
				ArrayDay = [...new Set(ArrayDay)].map(day => day.padStart(2, '0'));    // 去重   
				ArrayDay.sort();     // 默认从小到大排序
		


			//checkArrayTypes(ArrayOneYear);
			//checkArrayTypes(ArrayOneMonth);

			return {  ArrayOneYear, ArrayOneMonth, ArrayDay};
			}

	// 03 -- 时间块 - 辅助 ~ 时间±调整函数   → 在时间块函数时硕同要用到它  
	   function adjustedDate(days) {
		   let date = new Date();
		   date.setDate(date.getDate() + days);
		   let year = date.getFullYear();
		   let month = (date.getMonth() + 1).toString().padStart(2, '0');
		   let day = date.getDate().toString().padStart(2, '0');
		   return `${year}-${month}-${day}`;
		    }

	// 04 -- 时间块 - 筛选 - 辅助 - 搜索的 sting 处理的函数
		  function processIntervalday(Intervalday) {
				// 00 -- 防御设计 
				   if (!Intervalday || typeof Intervalday !== 'string' || !Intervalday.trim()) {
				       return true; // 防御设计
				       }
				
				// 01 - 简单处理： 去除两边空格并转为字符串，替换所有± ，因为有的时候不识别 ； 
				      Intervalday = Intervalday.trim();   
				      Intervalday = Intervalday.replace(/±/g, '+-');    // 替换所有 `±` 符号为 `+-`
				
				// 02 -  定义正则表达式匹配数字
				      const numberPattern = /[+-]?\d+/g;
				
				// 03 -  arrayA组 ~ = 等号开头的 （标准多个 yyyy-mm-dd日期）
				       // = 1 3 5 7  ，这种是相当于Anki的频率了的  
				       if (Intervalday.startsWith('=')) {
				       let items = Intervalday.slice(1).match(numberPattern);
				       if (!items) return true;
				
				       items = items.map(item => Number(item)).filter(item => !isNaN(item));
				
				       // 使用 adjustedDate 计算日期数组
				       let dates = items.map(adjustedDate);
				
				       // 去重并排序
				       dates = [...new Set(dates)].sort((a, b) => new Date(a) - new Date(b));
				
				       return { type: 'arrayA', values: dates };
				       }
				
				   // 04 -  arrayB组 ~ 双开对称区间；  判断是否是 “±” “+-”  “-+” 开头
				   if (Intervalday.startsWith('+-') || Intervalday.startsWith('-+') || Intervalday.startsWith('+±')) {
				       let items = Intervalday.slice(2).match(numberPattern);
				       if (!items || items.length === 0) return true;
				
				       let number = Math.abs(Number(items[0]));
				       let dateRange = [-number, number].map(adjustedDate);
				
				       // 去重并排序
				       dateRange = [...new Set(dateRange)].sort((a, b) => new Date(a) - new Date(b));
				
				       return { type: 'arrayB', values: dateRange };
				       }
				// 05 -- 01 - 准备 标准情况处理  ~ 处理非=等号 、 “±” “+-”  “-+” 开头的情况
				   let items = Intervalday.match(numberPattern);
				   if (!items) return true;    
				   items = items.map(item => Number(item)).filter(item => !isNaN(item));   
				      let tempArray = items;          // 存为临时数组
				
				// 05 -- 02 - 单边用0 补全；    （是否只有一个元素且不为0）
				    if (tempArray.length === 1 && tempArray[0] !== 0) {
				       tempArray.push(0);
				           
				       let dates = tempArray.map(adjustedDate);         // 使用 adjustedDate 计算日期数组
				
				       // 去重并排序
				       dates = [...new Set(dates)].sort((a, b) => new Date(a) - new Date(b));
				
				       return { type: 'arrayB', values: dates };
				       }
				
				// 05 -- 03 - 就是1个光0 ； 我们手动补一下前1天，仍然组成 t1~t2
				   if (tempArray.length === 1 && tempArray[0] === 0) {
				       tempArray.push(0);
				
				       // 使用 adjustedDate 计算日期数组
				       let dates = tempArray.map(adjustedDate);
				
				       // 去重并排序
				       dates = [...new Set(dates)].sort((a, b) => new Date(a) - new Date(b));
				
				       return { type: 'arrayA', values: dates };
				       }
				
				// 05 -- 04 - 多个间隔 ；  最最大的区间，组成 t1~t2  
				       if (tempArray.length > 1) {
				           // 使用 adjustedDate 计算日期数组
				           let dates = tempArray.map(adjustedDate);
				    
				           // 去重并排序
				           dates = [...new Set(dates)].sort((a, b) => new Date(a) - new Date(b));
				    
				           // 只取第1个元素和最后一个元素，组成新的数组
				           let dateRange = [dates[0], dates[dates.length - 1]];
				    
				           return { type: 'arrayB', values: dateRange };
				       }
				
				   return true; // 默认返回 true  ,即你空值的时候，是 treu 
				}

	// 05 -- 容器 -- 筛选 - 辅助 -- 把日期容器的参数 → 转换成 yyyy-mm-dd 日期 
		
	     function DateContainerStringCook(ContainerStartDateValue, ContainerEndDateValue, ContainerMonthDateValue, ContainerWeekDateValue) {
    
		        // 00 - 格式化日期函数，即处理为 string 格式的  yyyy-MM-dd
			        function formatDate(date) {
			            let year = date.getFullYear();
			            let month = (date.getMonth() + 1).toString().padStart(2, '0');
			            let day = date.getDate().toString().padStart(2, '0');
			            return `${year}-${month}-${day}`;
		                }
			    // 01 - 容错设计
			        if (!ContainerStartDateValue && !ContainerEndDateValue && !ContainerMonthDateValue && !ContainerWeekDateValue) {
			           return { type: 'none', values: [] };
			           }
		  
		        // 02 - 计算当前日期 tNowdate
			       let now = new Date();
			       let tNowYear = now.getFullYear();
			       let tNowMonth = (now.getMonth() + 1).toString().padStart(2, '0');
			       let tNowDay = now.getDate().toString().padStart(2, '0');
			       let tNowdate = `${tNowYear}-${tNowMonth}-${tNowDay}`;
		  
		        // 03 -  分组为 A 组 | C 组 ~    起始 | 结束日期 ，总有一个的；若只有一个用 t0当天日期，自动补全
					if (ContainerStartDateValue || ContainerEndDateValue) {
				       let tLow = ContainerStartDateValue ? ContainerStartDateValue : tNowdate;
				       let tUp = ContainerEndDateValue ? ContainerEndDateValue : tNowdate;
				   
				       if (tLow === tNowdate && tUp === tNowdate) {
				           // 去重并返回 C   ，这种是那种只选择了一个起点；自动补全为当天，这样有2个当天的时间，去重 ，我们存 C
				           let values = [...new Set([tLow, tUp].sort())];
				           return { type: 'arrayC', values: values };
				       } else {
				           // 不去重，返回 A   ； 即标准的    t1~t2时间区间 
				           let values = [tLow, tUp].sort();
				           return { type: 'arrayA', values: values };
				       }
		   			}
		   
		   
		        // 04 月容器  → 如  2025-08 ，拆分成  年，月；    分组为 B 组，并存储了【年，月】
				       if (ContainerMonthDateValue) {
				           let [tYear, tMonth] = ContainerMonthDateValue.split('-');
				           
				           return { type: 'arrayB', values: [tYear, tMonth] };
				       }
		
		
		        //  05 周容器  →    判断 4 个参数的值 - 3  -- 周容器，分组在 A 组； 本质上，仍然是   t1~t2时间区间 
		         // 如果存在值，把 2024-W25 ; 换算出 t1  , t2 周的起点日期 ；因为和 A 一样，我们减少类型，也称为 A 组
				       if (ContainerWeekDateValue) {
				           let [year, week] = ContainerWeekDateValue.split('-W');
				           year = parseInt(year);
				           week = parseInt(week);
				   
				           // 获取这一年的第一个星期一
				           let firstDayOfYear = new Date(year, 0, 1);
				           let dayOfWeek = firstDayOfYear.getDay();
				           let firstMonday = new Date(firstDayOfYear);
				   
				           // 如果第一个星期一不在本周内，调整到下一个星期一
				           if (dayOfWeek !== 1) {
				               firstMonday.setDate(firstDayOfYear.getDate() + (dayOfWeek === 0 ? 1 : 8 - dayOfWeek));
				           }
				   
				           // 计算目标周的第一个星期一
				           let firstDayOfWeek = new Date(firstMonday);
				           firstDayOfWeek.setDate(firstMonday.getDate() + (week - 1) * 7);
				   
				           // 计算目标周的第七天
				           let lastDayOfWeek = new Date(firstDayOfWeek);
				           lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
				   
				
				   
				           let tLow = formatDate(firstDayOfWeek);
				           let tUp = formatDate(lastDayOfWeek);
				           let values = [tLow, tUp].sort();
				           
				               return { type: 'arrayA', values: values };
				            }
				        
		       return { type: 'none', values: [] }; // 默认返回；如果有值就是  3种数组 ， arrayA   arrayB    arrayC   none
		      }

    // 06 -- 增加 key -- 为每个 task 增加  拆解 时间 date:  截止日期  \  安排日期  \ 完成日期
	    // 这个加的时间，有年，月，日，还有完整的日期，而且这个日期是可以直接运算的
	    // 本身系统的那个 due ， scheduled ，completion 的日期得转换才能用；（非标准的 yyyy-mm-dd）
		function addDateKeysToTask(task) {
		    let tDueFullyDate = '', tDueYear = '', tDueMonth = '', tDueDay = '';
		    let tScheduledFullyDate = '', tScheduledYear = '', tScheduledMonth = '', tScheduledDay = '';
		    let tCompletionFullyDate = '', tCompletionYear = '', tCompletionMonth = '', tCompletionDay = '';
		
		    if (task.due) {
		        const { tYear, tMonth, tDay } = formatDate(task.due);
		        tDueFullyDate = `${tYear}-${tMonth}-${tDay}`;
		        tDueYear = tYear;
		        tDueMonth = tMonth;
		        tDueDay = tDay;
		    }
		
		    if (task.scheduled) {
		        const { tYear, tMonth, tDay } = formatDate(task.scheduled);
		        tScheduledFullyDate = `${tYear}-${tMonth}-${tDay}`;
		        tScheduledYear = tYear;
		        tScheduledMonth = tMonth;
		        tScheduledDay = tDay;
		    }
		
		    if (task.completion) {
		        const { tYear, tMonth, tDay } = formatDate(task.completion);
		        tCompletionFullyDate = `${tYear}-${tMonth}-${tDay}`;
		        tCompletionYear = tYear;
		        tCompletionMonth = tMonth;
		        tCompletionDay = tDay;
		    }
		
		    return {
		        ...task,
		        tDueFullyDate,
		        tDueYear,
		        tDueMonth,
		        tDueDay,
		        tScheduledFullyDate,
		        tScheduledYear,
		        tScheduledMonth,
		        tScheduledDay,
		        tCompletionFullyDate,
		        tCompletionYear,
		        tCompletionMonth,
		        tCompletionDay
		    };
			}

	// 07 - 为抓取到的数组增加这个 key --  FileName |  OnlyHead |   Project  
		function AddKeyForTasks(tasks) {
		    return tasks.map(task => {
		        // 增加 project 键
					if (task.children.length === 0) {
					    if (!task.parent) {
					        task.project = false; // 独立任务
					    } else {
					        task.project = true; // 跟项目相关的子项
					    }
					} else if (task.children.length > 0) {
					    task.project = true; // 跟项目相关的父项
					}

		
		        // 处理 path 键，并形成 FileName 键
		        if (task.path) {
		            let fileName = task.path.split('/').pop().replace('.md', '');
		            task.FileName = ` [[${fileName}]] `;
		        }
		
		        // 利用 header 键，创造 OnlyHead 键
		        if (task.header) {
		            if (task.header.subpath) {
		                task.OnlyHead = task.header.subpath;
		            } else {
		                task.OnlyHead = task.header.path.split('/').pop().replace('.md', '');
		            }
		        }
		
		        return task; // 返回修改后的任务对象
		    });
			}

	// 08 -- String 搜索_Path_fileName_Tags_Heading_处理函数 
		  function StringCook(StringSearch) {
			    // 00 - 容错防御机制
				    if (!StringSearch || typeof StringSearch !== 'string') {
				        return true;
				    }
			
			    // 01 - 容错：转 string，去除两边空格，忽略大小写 \  如果处理后的 ListSearch 长度为 0，返回 true
			        StringSearch = StringSearch.trim().toLowerCase();
			
				    if (StringSearch.length === 0) {
				        return true;
				    }
			
			    // 02 - 分割；   标准，除了中英字符、+号、-号的，其他符号为分割符号
				    const splitRegex = /[^a-zA-Z0-9\u4e00-\u9fa5\+\-]/;
				    let parts = StringSearch.split(splitRegex);
				
				    let arrayA = [];
				    let arrayB = [];
				    let arrayC = [];
				
				    parts.forEach(part => {
				        part = part.trim();
				        if (part.length > 1) {
				            if (part.startsWith('-')) {
				                arrayA.push(part.substring(1).trim());
				            } else if (part.startsWith('+')) {
				                arrayB.push(part.substring(1).trim());
				            } else {
				                arrayC.push(part.trim());
				            }
				        } else if (part.length === 1 && part !== '+' && part !== '-') {
				            arrayC.push(part.trim());
				        }
				        });
			
			        // 删除所有非中英字符的符号
				    const removeNonAlphanumeric = (arr) => {
				        return arr.map(item => item.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '').trim());
				    };
			
				    arrayA = removeNonAlphanumeric(arrayA);
				    arrayB = removeNonAlphanumeric(arrayB);
				    arrayC = removeNonAlphanumeric(arrayC);
			
			    // 03 - 去重
				    arrayA = [...new Set(arrayA)];
				    arrayB = [...new Set(arrayB)];
				    arrayC = [...new Set(arrayC)];
			
			    // 04 - 交叉排除
				    arrayB = arrayB.filter(item => !arrayA.includes(item));
				    arrayC = arrayC.filter(item => !arrayA.includes(item));
				    arrayB = arrayB.filter(item => !arrayC.includes(item));
			
			    // 05 - 过滤掉空数组
				    arrayA = arrayA.length ? arrayA : null;
				    arrayB = arrayB.length ? arrayB : null;
				    arrayC = arrayC.length ? arrayC : null;
			
			    // 06 - 如果三个数组都为空，返回 true
				    if (!arrayA && !arrayB && !arrayC) {
				        return true;
				    }
				
				    return { arrayA, arrayB, arrayC };
				    }

		
	// 09 -- 提取 task 里面的日期时，必备的辅助函数 -- 把日期拆成年 | 月 |日 - 单独的
	    function formatDate(dateStr) {
			const date = new Date(dateStr);
			const year = date.getFullYear().toString();
			const month = (date.getMonth() + 1).toString().padStart(2, '0');
			const day = date.getDate().toString().padStart(2, '0');
			return { tYear: year, tMonth: month, tDay: day };
			}

	// 10 - 把拆解的日期 ，重新组成   年+月+日，即标准的 yyyy-mm-dd
		function formatFullDate(dateStr) {
		    const { tYear, tMonth, tDay } = formatDate(dateStr);
		    return `${tYear}-${tMonth}-${tDay}`;
			}

	// 11 -- 这个是创建的 - 把下拉选项框的 汉字 → 转成代码中能用的字母（如升序 asc ，降序 desc）
	 	function getSortOrder(param) {
		    // 去除参数两边的空格
		    const trimmedParam = param.trim();
		
		    // 根据条件返回相应的结果
		    if (trimmedParam === "升序") {
		        return "asc";
		    } else if (trimmedParam === "降序") {
		        return "desc";
		    }
		
		    // 不符合任何条件时返回 "asc"
		    return "asc";
			}

	// 12 -- 把分组的下拉框的汉字值，转换成  有用的  true \ false 
		function getGroup(param) {
		    // 去除参数两边的空格
		    const trimmedParam = param.trim();
		
		    // 根据条件返回相应的结果
		    if (trimmedParam === "不分组") {
		        return "false";
		    } else if (trimmedParam === "按 File 分组") {
		        return "true";
		    }
		
		    // 不符合任何条件时返回 "false"
		    return "false";
			}


    // 13 -- 防抖函数 -- 打包使用
		  function debounce(func, wait) {
		    let timeout;
		    return function(...args) {
		        clearTimeout(timeout);
		        timeout = setTimeout(() => {
		            func.apply(this, args);
		        }, wait);
		    };
			}

	// 14 -- 清除子项任务  --  因为是涉及到子项 ，所以要用递归的方法，不然没办法清到里层
		function cleanAllEmptyTasks(tasks) {
		    return tasks
		        .filter(task => task.text.trim() !== "" && task.text.length >= 1)
		        .map(task => {
		            if (task.children && task.children.length > 0) {
		                task.children = cleanAllEmptyTasks(task.children);
		            }
		            return task;
		        })
		        .filter(task => !(task.children && task.children.length === 0 && task.text.trim() === ""));
			}



// Task -- 筛选选项卡的函数  

 // 01 - row1 -- 今天到期  | 已经超期 |  有截止 due | 有 Scheduled 安排 | 已完成  | 项目完成
 
  //  Row1 --  01 -- due 今天到期 任务  -- 无日期筛选 + 可以用 due 排序 
	function ToDayDueFilter(TaksData, SwitchToDayDue) {
	    // 容错处理：SwitchToDayDue 强制转换为字符串并去除两边空格，忽略大小写
		    const filterCondition = String(SwitchToDayDue).trim().toLowerCase();
	
	    // SwitchToDayDue 未定义、为空或不包含 'true'，保留所有的 item
		    if (!filterCondition.includes('true')) {
		        return TaksData;
		    }
	
	    // 第1次过滤：只保留 completed 为 false 的项
		    TaksData = cleanAllEmptyTasks(TaksData) 
		    TaksData = TaksData.filter(task => task.completed === false);
	
	    // 第2次过滤：只保留存在 due key 的项
		    TaksData = TaksData.filter(task => task.due);
		    //dv.paragraph(TaksData.length);
		    
		
	    // 第3次过滤：保留 due 日期等于今天的项
		    let { FloatToday } = DateFilterPackage();
		    //dv.paragraph(FloatToday);
		    //dv.paragraph(TaksData[2]);
			//dv.paragraph( FloatToday);
		    TaksData = TaksData.filter(task => task.tDueFullyDate === FloatToday);
			
			
	    return TaksData;
	}

  //  Row1 --  02 -- OverDue  已经超期 due< 今天的 

	function OverDueFilter(TaksData, SwitchOverDue) {
	    // 00 -  容错处理：SwitchOverDue 强制转换为字符串并去除两边空格，忽略大小写
		    const filterCondition = String(SwitchOverDue).trim().toLowerCase();
	    
		    if (!filterCondition.includes('true')) {
		        return TaksData;  // // SwitchOverDue 未定义、为空或不包含 'true'，保留所有的 item
		    }
	
	    // 01 - 第1次过滤：只保留 completed 为 false 的项
		    TaksData = cleanAllEmptyTasks(TaksData) 
		    TaksData = TaksData.filter(task => task.completed === false);
	
	    // 02 - 第2次过滤：只保留存在 due 或 scheduled key 的项
		    TaksData = TaksData.filter(task => task.due);
	
	    // 03 - 第3次过滤：保留 due 日期或 scheduled 日期小于今天的项
		    let { FloatToday } = DateFilterPackage();
	
			TaksData = TaksData.filter(task => task.tDueFullyDate < FloatToday);
	    
		// 04 - 中文日期搜索搜索 （本质上也是去匹配哈  ）
				  let { ArrayOneYear, ArrayOneMonth, ArrayDay } = ChineseSwitch(DateSearch);
								  			  
				  
				  if (ArrayOneYear.length + ArrayOneMonth.length + ArrayDay.length > 0) {
					  TaksData = TaksData.filter(task => {
						
						const conditionDueYear = ArrayOneYear.length === 0 || (task.tDueYear && ArrayOneYear.includes(task.tDueYear));
						const conditionDueMonth = ArrayOneMonth.length === 0 || (task.tDueMonth && ArrayOneMonth.includes(task.tDueMonth));
						const conditionDueDay = ArrayDay.length === 0 || (task.tDueDay && ArrayDay.includes(task.tDueDay));
						const dueMatches = conditionDueYear && conditionDueMonth && conditionDueDay;
		
					   return dueMatches ;
						});
					}
				    
		// 05 - 时间块  筛选：根据 Intervalday 进行筛选
				let result = processIntervalday(Intervalday);
	
	
				//dv.paragraph( result.type);
				//dv.paragraph( result.values);
	
				if (result !== true) {
					if (result.type === 'arrayA') {
						const arrayA = result.values;
						TaksData = TaksData.filter(task => {
							const conditionDueFullyDate = arrayA.length === 0 || (task.tDueFullyDate && arrayA.includes(task.tDueFullyDate));	
							return conditionDueFullyDate ;
						});
					}
				
					if (result.type === 'arrayB') {
						let [tLow, tUp] = result.values.sort();
						TaksData = TaksData.filter(task => {
							const conditionDueFullyDate = tLow <= task.tDueFullyDate && task.tDueFullyDate <= tUp;
							return conditionDueFullyDate ;
						});
					}
					}
			
		// 06 - 日期   容器筛选  
							
						// 01 - 接收  DateContainerStringCook ，此函数的参数  
							let ContainerDateResult = DateContainerStringCook(ContainerStartDateValue, ContainerEndDateValue, ContainerMonthDateValue, ContainerWeekDateValue);
						
						// 02 - 容错处理，如果 ContainerDateResult 的类型为 'none'，不过滤(就是指 ，日期系统容器，没选择哈  )
							if (ContainerDateResult.type === 'none') {
							    return TaksData;
							}
						
						// 03 - 分类处理 - 1 -- 返回 的为 A 类    类似 ：[2024-06-18, 2024-07-14  ]   ;  里面有2个标准的 yyyy-mm-dd 日期 
							if (ContainerDateResult.type === 'arrayA') {
							    let [tLow, tUp] = ContainerDateResult.values.sort();
							
							    TaksData = TaksData.filter(task => {
							        const conditionDueFullyDate = tLow <= task.tDueFullyDate && task.tDueFullyDate <= tUp;
	
							        return conditionDueFullyDate ;
							    });
							}
						
						// 03 - 分类处理 - 2 -- 返回的为  B 类 ，类似  类似 ： [2024 ,  08 ]  ;  里面有2个标准的 yyyy 年份，与一个月份 mm       
							if (ContainerDateResult.type === 'arrayB') {
							    let [tContainerYear, tContainerMonth] = ContainerDateResult.values;
							
							    TaksData = TaksData.filter(task => {
							        // 针对 due 的匹配规则
							        const conditionDueYear = !tContainerYear || task.tDueYear === tContainerYear;
							        const conditionDueMonth = !tContainerMonth || task.tDueMonth === tContainerMonth;
							        const dueMatches = conditionDueYear && conditionDueMonth;					
	
							        // 最终条件
							        return dueMatches;
							    });
								}
							
						// 03 - 分类处理 - 3 --  返回的为 C 类，  类似 ： [ 2024-07-14 ]  ; 里面只有1 个标准的 yyyy-mm-dd 日期 
							if (ContainerDateResult.type === 'arrayC') {
							    let tOnlyDate = ContainerDateResult.values[0];
							
							    TaksData = TaksData.filter(task => {
							        const conditionDueFullyDate = task.tDueFullyDate === tOnlyDate;		
							        return conditionDueFullyDate ;
							    });
							}
				  
	
	
	    // 返回筛选后的 TaksData
	    return TaksData;
		}

  //  Row1 --  03 -- Havedue  |  有截止  （ 至少有 due 的）
		function HaveDueFilter(TaksData, SwitchHaveDue) {
				// 00  - 容错处理：SwitchHaveDue 强制转换为字符串并去除两边空格，忽略大小写
					const filterCondition = String(SwitchHaveDue).trim().toLowerCase();
	
	
					if (!filterCondition.includes('true')) {
						return TaksData;  // SwitchHaveDue 未定义、为空或不包含 'true'，保留所有的 item
					}
	
				// 01 --  第1次过滤：只保留 completed 为 false 的项
					TaksData = cleanAllEmptyTasks(TaksData) 
					TaksData = TaksData.filter(task => task.completed === false);
	
				// 02 --  第2次过滤：只保留存在 due key 的项
					TaksData = TaksData.filter(task => task.due);
	
				// 03 - 中文日期搜索搜索 （本质上也是去匹配哈  ）
					  let { ArrayOneYear, ArrayOneMonth, ArrayDay } = ChineseSwitch(DateSearch);
					  //dv.paragraph(ChineseSwitch(DateSearch));
					  // 年月日，你总得满足一个 ；对比的只是 due 这个 key 的日期
					  if (ArrayOneYear.length + ArrayOneMonth.length + ArrayDay.length > 0) {
						  TaksData = TaksData.filter(task => {
							
							const conditionDueYear = ArrayOneYear.length === 0 || (task.tDueYear && ArrayOneYear.includes(task.tDueYear));
							const conditionDueMonth = ArrayOneMonth.length === 0 || (task.tDueMonth && ArrayOneMonth.includes(task.tDueMonth));
							const conditionDueDay = ArrayDay.length === 0 || (task.tDueDay && ArrayDay.includes(task.tDueDay));
							const dueMatches = conditionDueYear && conditionDueMonth && conditionDueDay;
	
							return dueMatches ;
							});
						}
				
				// 04 - 时间块  筛选：根据 Intervalday 进行筛选
						let result = processIntervalday(Intervalday);
			
			
						//dv.paragraph( result.type);
						//dv.paragraph( result.values);
			
						if (result !== true) {
							if (result.type === 'arrayA') {
								const arrayA = result.values;
								TaksData = TaksData.filter(task => {
									const conditionDueFullyDate = arrayA.length === 0 || (task.tDueFullyDate && arrayA.includes(task.tDueFullyDate));		
									return conditionDueFullyDate;
								});
							}
						
							if (result.type === 'arrayB') {
								let [tLow, tUp] = result.values.sort();
								TaksData = TaksData.filter(task => {
									const conditionDueFullyDate = tLow <= task.tDueFullyDate && task.tDueFullyDate <= tUp;
									return conditionDueFullyDate ;
								});
							}
							}
				
				// 05 - 日期   容器筛选  
							
						// 01 - 接收  DateContainerStringCook ，此函数的参数  
							let ContainerDateResult = DateContainerStringCook(ContainerStartDateValue, ContainerEndDateValue, ContainerMonthDateValue, ContainerWeekDateValue);
						
						// 02 - 容错处理，如果 ContainerDateResult 的类型为 'none'，不过滤(就是指 ，日期系统容器，没选择哈  )
							if (ContainerDateResult.type === 'none') {
								return TaksData;
							}
						
						// 03 - 分类处理 - 1 -- 返回 的为 A 类    类似 ：[2024-06-18, 2024-07-14  ]   ;  里面有2个标准的 yyyy-mm-dd 日期 
							if (ContainerDateResult.type === 'arrayA') {
								let [tLow, tUp] = ContainerDateResult.values.sort();
							
								TaksData = TaksData.filter(task => {
									const conditionDueFullyDate = tLow <= task.tDueFullyDate && task.tDueFullyDate <= tUp;
									return conditionDueFullyDate;
								});
							}
						
						// 03 - 分类处理 - 2 -- 返回的为  B 类 ，类似  类似 ： [2024 ,  08 ]  ;  里面有2个标准的 yyyy 年份，与一个月份 mm       
							if (ContainerDateResult.type === 'arrayB') {
								let [tContainerYear, tContainerMonth] = ContainerDateResult.values;
							
								TaksData = TaksData.filter(task => {
									// 针对 due 的匹配规则
									const conditionDueYear = !tContainerYear || task.tDueYear === tContainerYear;
									const conditionDueMonth = !tContainerMonth || task.tDueMonth === tContainerMonth;
									const dueMatches = conditionDueYear && conditionDueMonth;						
									// 最终条件
									return dueMatches;
								});
								}
							
						// 03 - 分类处理 - 3 --  返回的为 C 类，  类似 ： [ 2024-07-14 ]  ; 里面只有1 个标准的 yyyy-mm-dd 日期 
							if (ContainerDateResult.type === 'arrayC') {
								let tOnlyDate = ContainerDateResult.values[0];
							
								TaksData = TaksData.filter(task => {
									const conditionDueFullyDate = task.tDueFullyDate === tOnlyDate;
									return conditionDueFullyDate;
								});
							}
	
				// 返回筛选后的 TaksData
				return TaksData;
				}

  //  Row1 --  04 -- Have Scheduled | 有安排  （至少得有 scheduled）
	 function HaveScheduledFilter(TaksData, SwitchHaveScheduled) {
		    // 00 - 容错处理：SwitchHaveScheduled 强制转换为字符串并去除两边空格，忽略大小写
			    const filterCondition = String(SwitchHaveScheduled).trim().toLowerCase();
		  
			    if (!filterCondition.includes('true')) {
			        return TaksData;   // SwitchHaveScheduled 未定义、为空或不包含 'true'，保留所有的 item
			    }
			
		    // 01 - 第1次过滤：只保留 completed 为 false 的项
			    TaksData = cleanAllEmptyTasks(TaksData) 
			    TaksData = TaksData.filter(task => task.completed === false);
		
		    // 02 - 第2次过滤：只保留存在 scheduled key 的项
			    TaksData = TaksData.filter(task => task.scheduled);
		
			
			// 03 - 中文日期搜索搜索 （本质上也是去匹配哈 ，此处是 Scheduled 这个 key 的日期  ）
				  let { ArrayOneYear, ArrayOneMonth, ArrayDay } = ChineseSwitch(DateSearch);
				  //dv.paragraph(ChineseSwitch(DateSearch));
				  
				  if (ArrayOneYear.length + ArrayOneMonth.length + ArrayDay.length > 0) {
					  TaksData = TaksData.filter(task => {					
			
						const conditionScheduledYear = ArrayOneYear.length === 0 || (task.tScheduledYear && ArrayOneYear.includes(task.tScheduledYear));
						const conditionScheduledMonth = ArrayOneMonth.length === 0 || (task.tScheduledMonth && ArrayOneMonth.includes(task.tScheduledMonth));
						const conditionScheduledDay = ArrayDay.length === 0 || (task.tScheduledDay && ArrayDay.includes(task.tScheduledDay));
						const scheduledMatches = conditionScheduledYear && conditionScheduledMonth && conditionScheduledDay;
		
					   return  scheduledMatches;
						});
					}
				    
			// 04 - 时间块  筛选：根据 Intervalday 进行筛选
					let result = processIntervalday(Intervalday);	
		
					//dv.paragraph( result.type);
					//dv.paragraph( result.values);
		
					if (result !== true) {
						if (result.type === 'arrayA') {
							const arrayA = result.values;
							TaksData = TaksData.filter(task => {
								const conditionScheduledFullyDate = arrayA.length === 0 || (task.tScheduledFullyDate && arrayA.includes(task.tScheduledFullyDate));
								return conditionScheduledFullyDate;
							});
						}
					
						if (result.type === 'arrayB') {
							let [tLow, tUp] = result.values.sort();
							TaksData = TaksData.filter(task => {	
								const conditionScheduledFullyDate = tLow <= task.tScheduledFullyDate && task.tScheduledFullyDate <= tUp;
								return conditionScheduledFullyDate;
							});
						}
						}
				
			// 05 - 日期   容器筛选  
							
						// 01 - 接收  DateContainerStringCook ，此函数的参数  
							let ContainerDateResult = DateContainerStringCook(ContainerStartDateValue, ContainerEndDateValue, ContainerMonthDateValue, ContainerWeekDateValue);
						
						// 02 - 容错处理，如果 ContainerDateResult 的类型为 'none'，不过滤(就是指 ，日期系统容器，没选择哈  )
							if (ContainerDateResult.type === 'none') {
							    return TaksData;
							}
						
						// 03 - 分类处理 - 1 -- 返回 的为 A 类    类似 ：[2024-06-18, 2024-07-14  ]   ;  里面有2个标准的 yyyy-mm-dd 日期 
							if (ContainerDateResult.type === 'arrayA') {
							    let [tLow, tUp] = ContainerDateResult.values.sort();
							
							    TaksData = TaksData.filter(task => {		
							        const conditionScheduledFullyDate = tLow <= task.tScheduledFullyDate && task.tScheduledFullyDate <= tUp;
							        return conditionScheduledFullyDate;
							    });
							}
						
						// 03 - 分类处理 - 2 -- 返回的为  B 类 ，类似  类似 ： [2024 ,  08 ]  ;  里面有2个标准的 yyyy 年份，与一个月份 mm       
							if (ContainerDateResult.type === 'arrayB') {
							    let [tContainerYear, tContainerMonth] = ContainerDateResult.values;
							
							    TaksData = TaksData.filter(task => {
							      
							        // 针对 scheduled 的匹配规则
							        const conditionScheduledYear = !tContainerYear || task.tScheduledYear === tContainerYear;
							        const conditionScheduledMonth = !tContainerMonth || task.tScheduledMonth === tContainerMonth;
							        const scheduledMatches = conditionScheduledYear && conditionScheduledMonth;
							
							        // 最终条件
							        return  scheduledMatches;
							    });
								}
							
						// 03 - 分类处理 - 3 --  返回的为 C 类，  类似 ： [ 2024-07-14 ]  ; 里面只有1 个标准的 yyyy-mm-dd 日期 
							if (ContainerDateResult.type === 'arrayC') {
							    let tOnlyDate = ContainerDateResult.values[0];
							
							    TaksData = TaksData.filter(task => {						        
							        const conditionScheduledFullyDate = task.tScheduledFullyDate === tOnlyDate;
							        return conditionScheduledFullyDate;
							    });
							}
				  
		    // 返回筛选后的 TaksData
		    return TaksData;
			}

  //  Row1 --  05 --  Done -- 已完成；叠加了日期了的（但是如果完成日期被删除了的话，筛选不出来的）
	
	function DoneFilter(TaksData, SwitchDone) {
	    // 01 - 容错处理：SwitchDone 强制转换为字符串并去除两边空格，忽略大小写
		    const filterCondition = String(SwitchDone).trim().toLowerCase();
			    
		    if (!filterCondition.includes('true')) {
		        return TaksData;  // SwitchDone 未定义、为空或不包含 'true'，保留所有的 item
		    }
	
	    // 02 - 第1次过滤：只保留 completed 为 true 的项
		    TaksData = cleanAllEmptyTasks(TaksData) 
		    TaksData = TaksData.filter(task => task.completed === true);
	
	    // 其他筛选 ...（此部分你可以自行添加其他过滤逻辑）
	
		// 03 - 中文日期搜索搜索 （本质上也是去匹配哈  ）
			  let { ArrayOneYear, ArrayOneMonth, ArrayDay } = ChineseSwitch(DateSearch);
			  //dv.paragraph(ChineseSwitch(DateSearch));
			  // 年月日，你总得满足一个 ；对比的只是 Completion 这个 key 的日期
			  if (ArrayOneYear.length + ArrayOneMonth.length + ArrayDay.length > 0) {
				  TaksData = TaksData.filter(task => {
				
					const conditionCompletionYear = ArrayOneYear.length === 0 || (task.tCompletionYear && ArrayOneYear.includes(task.tCompletionYear));
					const conditionCompletionMonth = ArrayOneMonth.length === 0 || (task.tCompletionMonth && ArrayOneMonth.includes(task.tCompletionMonth));
					const conditionCompletionDay = ArrayDay.length === 0 || (task.tCompletionDay && ArrayDay.includes(task.tCompletionDay));
					const CompletionMatches = conditionCompletionYear && conditionCompletionMonth && conditionCompletionDay;
	
					return CompletionMatches ;
					});
				}
	
		// 04 - 时间块  筛选：根据 Intervalday 进行筛选
			let result = processIntervalday(Intervalday);
			//dv.paragraph( result.type);
			//dv.paragraph( result.values);
	
			if (result !== true) {
				if (result.type === 'arrayA') {
					const arrayA = result.values;
					TaksData = TaksData.filter(task => {
						const conditionCompletionFullyDate = arrayA.length === 0 || (task.tCompletionFullyDate && arrayA.includes(task.tCompletionFullyDate));		
						return conditionCompletionFullyDate;
					});
				}
			
				if (result.type === 'arrayB') {
					let [tLow, tUp] = result.values.sort();
					TaksData = TaksData.filter(task => {
						const conditionCompletionFullyDate = tLow <= task.tCompletionFullyDate && task.tCompletionFullyDate <= tUp;
						return conditionCompletionFullyDate ;
					});
				}
				}
					
		// 05 - 日期   容器筛选  
				
			// 01 - 接收  DateContainerStringCook ，此函数的参数  
				let ContainerDateResult = DateContainerStringCook(ContainerStartDateValue, ContainerEndDateValue, ContainerMonthDateValue, ContainerWeekDateValue);
			
			// 02 - 容错处理，如果 ContainerDateResult 的类型为 'none'，不过滤(就是指 ，日期系统容器，没选择哈  )
				if (ContainerDateResult.type === 'none') {
					return TaksData;
				}
			
			// 03 - 分类处理 - 1 -- 返回 的为 A 类    类似 ：[2024-06-18, 2024-07-14  ]   ;  里面有2个标准的 yyyy-mm-dd 日期 
				if (ContainerDateResult.type === 'arrayA') {
					let [tLow, tUp] = ContainerDateResult.values.sort();
				
					TaksData = TaksData.filter(task => {
						const conditionCompletionFullyDate = tLow <= task.tCompletionFullyDate && task.tCompletionFullyDate <= tUp;
						return conditionCompletionFullyDate;
					});
				}
			
			// 03 - 分类处理 - 2 -- 返回的为  B 类 ，类似  类似 ： [2024 ,  08 ]  ;  里面有2个标准的 yyyy 年份，与一个月份 mm       
				if (ContainerDateResult.type === 'arrayB') {
					let [tContainerYear, tContainerMonth] = ContainerDateResult.values;
				
					TaksData = TaksData.filter(task => {
						// 针对 Completion 的匹配规则
						const conditionCompletionYear = !tContainerYear || task.tCompletionYear === tContainerYear;
						const conditionCompletionMonth = !tContainerMonth || task.tCompletionMonth === tContainerMonth;
						const CompletionMatches = conditionCompletionYear && conditionCompletionMonth;						
						// 最终条件
						return CompletionMatches;
					});
					}
				
			// 03 - 分类处理 - 3 --  返回的为 C 类，  类似 ： [ 2024-07-14 ]  ; 里面只有1 个标准的 yyyy-mm-dd 日期 
				if (ContainerDateResult.type === 'arrayC') {
					let tOnlyDate = ContainerDateResult.values[0];
				
					TaksData = TaksData.filter(task => {
						const conditionCompletionFullyDate = task.tCompletionFullyDate === tOnlyDate;
						return conditionCompletionFullyDate;
					});
				}
	
	
	    // 返回筛选后的 TaksData
	    return TaksData;
		}
 
  //  Row1 --  06 -- 项目彻底完成  （ fullyCompleted） 
	 // （针对对象是-项目，即有子级，但是没有上级的任务，这样才是项目- 元始级哈）
	 // （只有这个元始级彻底完成了，才算整个项目完成了）
	function ProjectfullyCompletedFilter(TaksData, SwitchProjectfullyCompleted) {
	    // 步骤1：处理 SwitchProjectfullyCompleted
		    SwitchProjectfullyCompleted = String(SwitchProjectfullyCompleted).trim().toLowerCase();
		    if (!SwitchProjectfullyCompleted || SwitchProjectfullyCompleted !== 'true') {
		        return TaksData;
		    }
	
	    // 02 -- 过滤 （非项目类 \ 子项 \  未完成的项）
		    TaksData = cleanAllEmptyTasks(TaksData) 
		    TaksData = TaksData.filter(task => {
		        if (task.project === false) {
		            return false; // 如果项目键为 false，踢除任务，因为不是项目相关的
		        }
		
		        // 步骤3：过滤掉有 parent 的任务 (即过滤掉子任务 )
		        if (task.parent) {
		            return false; // 如果存在 parent 键，踢除任务，说明它不是元始级，最多就是个中间级的；  
		        }
		
		        // 步骤4：筛选完全完成的项目 【经过前面的筛选，我们找着到元始级的 任务，即项目】
		        if (task.fullyCompleted === false) {
		            return false; // 如果 fullyCompleted 键为 false，踢除任务 ，因为整个项目没完成   
		        }
		
		        return true; // 保留所有符合条件的任务
		    });
		
		// 03 - 中文日期搜索搜索 （本质上也是去匹配哈  ）
			  let { ArrayOneYear, ArrayOneMonth, ArrayDay } = ChineseSwitch(DateSearch);
			  //dv.paragraph(ChineseSwitch(DateSearch));
			  // 年月日，你总得满足一个 ；对比的只是 Completion 这个 key 的日期
			  if (ArrayOneYear.length + ArrayOneMonth.length + ArrayDay.length > 0) {
				  TaksData = TaksData.filter(task => {
				
					const conditionCompletionYear = ArrayOneYear.length === 0 || (task.tCompletionYear && ArrayOneYear.includes(task.tCompletionYear));
					const conditionCompletionMonth = ArrayOneMonth.length === 0 || (task.tCompletionMonth && ArrayOneMonth.includes(task.tCompletionMonth));
					const conditionCompletionDay = ArrayDay.length === 0 || (task.tCompletionDay && ArrayDay.includes(task.tCompletionDay));
					const CompletionMatches = conditionCompletionYear && conditionCompletionMonth && conditionCompletionDay;
	
					return CompletionMatches ;
					});
				}
	
		// 04 - 时间块  筛选：根据 Intervalday 进行筛选
			let result = processIntervalday(Intervalday);
			//dv.paragraph( result.type);
			//dv.paragraph( result.values);
	
			if (result !== true) {
				if (result.type === 'arrayA') {
					const arrayA = result.values;
					TaksData = TaksData.filter(task => {
						const conditionCompletionFullyDate = arrayA.length === 0 || (task.tCompletionFullyDate && arrayA.includes(task.tCompletionFullyDate));		
						return conditionCompletionFullyDate;
					});
				}
			
				if (result.type === 'arrayB') {
					let [tLow, tUp] = result.values.sort();
					TaksData = TaksData.filter(task => {
						const conditionCompletionFullyDate = tLow <= task.tCompletionFullyDate && task.tCompletionFullyDate <= tUp;
						return conditionCompletionFullyDate ;
					});
				}
				}
					
		// 05 - 日期   容器筛选  
				
			// 01 - 接收  DateContainerStringCook ，此函数的参数  
				let ContainerDateResult = DateContainerStringCook(ContainerStartDateValue, ContainerEndDateValue, ContainerMonthDateValue, ContainerWeekDateValue);
			
			// 02 - 容错处理，如果 ContainerDateResult 的类型为 'none'，不过滤(就是指 ，日期系统容器，没选择哈  )
				if (ContainerDateResult.type === 'none') {
					return TaksData;
				}
			
			// 03 - 分类处理 - 1 -- 返回 的为 A 类    类似 ：[2024-06-18, 2024-07-14  ]   ;  里面有2个标准的 yyyy-mm-dd 日期 
				if (ContainerDateResult.type === 'arrayA') {
					let [tLow, tUp] = ContainerDateResult.values.sort();
				
					TaksData = TaksData.filter(task => {
						const conditionCompletionFullyDate = tLow <= task.tCompletionFullyDate && task.tCompletionFullyDate <= tUp;
						return conditionCompletionFullyDate;
					});
				}
			
			// 03 - 分类处理 - 2 -- 返回的为  B 类 ，类似  类似 ： [2024 ,  08 ]  ;  里面有2个标准的 yyyy 年份，与一个月份 mm       
				if (ContainerDateResult.type === 'arrayB') {
					let [tContainerYear, tContainerMonth] = ContainerDateResult.values;
				
					TaksData = TaksData.filter(task => {
						// 针对 Completion 的匹配规则
						const conditionCompletionYear = !tContainerYear || task.tCompletionYear === tContainerYear;
						const conditionCompletionMonth = !tContainerMonth || task.tCompletionMonth === tContainerMonth;
						const CompletionMatches = conditionCompletionYear && conditionCompletionMonth;						
						// 最终条件
						return CompletionMatches;
					});
					}
				
			// 03 - 分类处理 - 3 --  返回的为 C 类，  类似 ： [ 2024-07-14 ]  ; 里面只有1 个标准的 yyyy-mm-dd 日期 
				if (ContainerDateResult.type === 'arrayC') {
					let tOnlyDate = ContainerDateResult.values[0];
				
					TaksData = TaksData.filter(task => {
						const conditionCompletionFullyDate = task.tCompletionFullyDate === tOnlyDate;
						return conditionCompletionFullyDate;
					});
				}
	
			return TaksData;
		   }

  //  Row1 --  07 -- 本月 - 未完成  
	
		function MonthNotDoneFilter(TaksData, SwitchMonthNotDone) {
		    // 容错处理
		    SwitchMonthNotDone = String(SwitchMonthNotDone).trim().toLowerCase();
		
		    // 如果 SwitchMonthNotDone 未定义、为空或不包含 'true'，保留所有的 item
		    if (!SwitchMonthNotDone || !SwitchMonthNotDone.includes('true')) {
		        return TaksData;
		    }
		
		    // 第1次过滤：只保留 completed 为 false 的项
		    TaksData = cleanAllEmptyTasks(TaksData)   // 过滤空的  
		    TaksData = TaksData.filter(task => task.completed === false);
		
		    // 第2次过滤：只保留存在 due 这个 key 的项
		    TaksData = TaksData.filter(task => task.due !== undefined);
		
			let { CurrentYearNumber, CurrentMonthNumber } = DateFilterPackage(); // 解析动态的本年本月数
		
			// 匹配筛选：只保留 tDueMonth 等于 CurrentMonthNumber 的项
			TaksData = TaksData.filter(task => task.tDueMonth === CurrentMonthNumber && task.tDueYear === CurrentYearNumber);
		
		    // 返回最终过滤后的数据
		    return TaksData;
		}

 // 02 - row2 -- 待办清单  | 有规划未完成 |  全部完成 | 循环 | 意外  | 项目没完成
  
  // Row2 --  01 --   待办清单 -- （有 due, 或者  Scheduled）  
	  function WaitingToDoList(TaksData, SwitchWaitingToDoList, WaitingDayNumber) {
	    // 容错处理：SwitchWaitingToDoList 强制转换为字符串并去除两边空格，忽略大小写
	    const filterCondition = String(SwitchWaitingToDoList).trim().toLowerCase();
	
	    // SwitchWaitingToDoList 未定义、为空或不包含 'true'，保留所有的 item
	    if (!filterCondition.includes('true')) {
	        return TaksData;
	    }
	
	    // 容错处理：WaitingDayNumber 强制转换为 number，如果转换后的值为 0，令 KeepWatchDay = 7
	    let KeepWatchDay = Number(WaitingDayNumber);
	    if (isNaN(KeepWatchDay) || KeepWatchDay === 0) {
	        KeepWatchDay = 7;
	    }
	
	    // 第1次过滤：只保留 completed 为 false 的项
	    TaksData = cleanAllEmptyTasks(TaksData) 
	    TaksData = TaksData.filter(task => task.completed === false);
	
	    // 第2次过滤：只保留存在 due 或 scheduled key 的项
	    TaksData = TaksData.filter(task => task.due || task.scheduled);
	
	    // 获取动态今天的时间值
	    let { FloatToday } = DateFilterPackage();
	
	    // 第3次过滤
			TaksData = TaksData.filter(task => {
			    const tDueFullyDate = task.tDueFullyDate;
			    const tScheduledFullyDate = task.tScheduledFullyDate;
			
			    const condition_tDueFullyDate = tDueFullyDate 
			        ? (new Date(tDueFullyDate) - new Date(FloatToday)) / (1000 * 60 * 60 * 24) > 0 &&
			          (new Date(tDueFullyDate) - new Date(FloatToday)) / (1000 * 60 * 60 * 24) < KeepWatchDay
			        : false;
			    
			    const condition_tScheduledFullyDate = tScheduledFullyDate 
			        ? (new Date(tScheduledFullyDate) - new Date(FloatToday)) / (1000 * 60 * 60 * 24) > 0 &&
			          (new Date(tScheduledFullyDate) - new Date(FloatToday)) / (1000 * 60 * 60 * 24) < KeepWatchDay
			        : false;
			
			    return condition_tDueFullyDate || condition_tScheduledFullyDate;
			});

	    // 返回筛选后的 TaksData
	    return TaksData;
		}

  // Row2 --  02 --  有安排\但未完成 （就是有 due \  Scheduled ，但是没完成）
	// 这个与等待分配安排 ，有关系 ； 
	// 等待分配是没有 care 到时间； 如果是  "等待分配安排"  + 筛选了日期  ==即等价于 此"已规划（但未完成）"

	function GoleNotDoneFilter(TaksData, SwitchGoleNotDone) {
	        // 00 - 容错处理：SwitchGoleNotDone 强制转换为字符串并去除两边空格，忽略大小写
			    const filterCondition = String(SwitchGoleNotDone).trim().toLowerCase();
	
			    if (!filterCondition.includes('true')) {
			        return TaksData;       // 未定义、为空或不包含 'true'，保留所有的 item
			    }
	
		    // 01 --  第1次过滤：只保留 completed 为 false 的项
			    TaksData = cleanAllEmptyTasks(TaksData); 
			    TaksData = TaksData.filter(task => task.completed === false);
				
				
		    // 02 --  第2次过滤：保留存在 due、scheduled 这2个 key 的项
			    TaksData = TaksData.filter(task => task.due || task.scheduled);
				
			
			// 03 - 中文日期搜索搜索 （本质上也是去匹配哈  ）
				      let { ArrayOneYear, ArrayOneMonth, ArrayDay } = ChineseSwitch(DateSearch);
				      //dv.paragraph(ChineseSwitch(DateSearch));
				      
					  if (ArrayOneYear.length + ArrayOneMonth.length + ArrayDay.length > 0) {
						  TaksData = TaksData.filter(task => {
						    
				            const conditionDueYear = ArrayOneYear.length === 0 || (task.tDueYear && ArrayOneYear.includes(task.tDueYear));
				            const conditionDueMonth = ArrayOneMonth.length === 0 || (task.tDueMonth && ArrayOneMonth.includes(task.tDueMonth));
				            const conditionDueDay = ArrayDay.length === 0 || (task.tDueDay && ArrayDay.includes(task.tDueDay));
				            const dueMatches = conditionDueYear && conditionDueMonth && conditionDueDay;
				
				            const conditionScheduledYear = ArrayOneYear.length === 0 || (task.tScheduledYear && ArrayOneYear.includes(task.tScheduledYear));
				            const conditionScheduledMonth = ArrayOneMonth.length === 0 || (task.tScheduledMonth && ArrayOneMonth.includes(task.tScheduledMonth));
				            const conditionScheduledDay = ArrayDay.length === 0 || (task.tScheduledDay && ArrayDay.includes(task.tScheduledDay));
				            const scheduledMatches = conditionScheduledYear && conditionScheduledMonth && conditionScheduledDay;
			
			               return dueMatches || scheduledMatches;
					        });
						}
			    
			// 04 - 时间块  筛选：根据 Intervalday 进行筛选
					let result = processIntervalday(Intervalday);
		
		
					//dv.paragraph( result.type);
					//dv.paragraph( result.values);
		
					if (result !== true) {
						if (result.type === 'arrayA') {
							const arrayA = result.values;
							TaksData = TaksData.filter(task => {
								const conditionDueFullyDate = arrayA.length === 0 || (task.tDueFullyDate && arrayA.includes(task.tDueFullyDate));
								const conditionScheduledFullyDate = arrayA.length === 0 || (task.tScheduledFullyDate && arrayA.includes(task.tScheduledFullyDate));
								return conditionDueFullyDate || conditionScheduledFullyDate;
							});
						}
					
						if (result.type === 'arrayB') {
							let [tLow, tUp] = result.values.sort();
							TaksData = TaksData.filter(task => {
								const conditionDueFullyDate = tLow <= task.tDueFullyDate && task.tDueFullyDate <= tUp;
								const conditionScheduledFullyDate = tLow <= task.tScheduledFullyDate && task.tScheduledFullyDate <= tUp;
								return conditionDueFullyDate || conditionScheduledFullyDate;
							});
						}
						}
			
			// 05 - 日期   容器筛选  
						
					// 01 - 接收  DateContainerStringCook ，此函数的参数  
						let ContainerDateResult = DateContainerStringCook(ContainerStartDateValue, ContainerEndDateValue, ContainerMonthDateValue, ContainerWeekDateValue);
					
					// 02 - 容错处理，如果 ContainerDateResult 的类型为 'none'，不过滤(就是指 ，日期系统容器，没选择哈  )
						if (ContainerDateResult.type === 'none') {
						    return TaksData;
						}
					
					// 03 - 分类处理 - 1 -- 返回 的为 A 类    类似 ：[2024-06-18, 2024-07-14  ]   ;  里面有2个标准的 yyyy-mm-dd 日期 
						if (ContainerDateResult.type === 'arrayA') {
						    let [tLow, tUp] = ContainerDateResult.values.sort();
						
						    TaksData = TaksData.filter(task => {
						        const conditionDueFullyDate = tLow <= task.tDueFullyDate && task.tDueFullyDate <= tUp;
						        const conditionScheduledFullyDate = tLow <= task.tScheduledFullyDate && task.tScheduledFullyDate <= tUp;
						        return conditionDueFullyDate || conditionScheduledFullyDate;
						    });
						}
					
					// 03 - 分类处理 - 2 -- 返回的为  B 类 ，类似  类似 ： [2024 ,  08 ]  ;  里面有2个标准的 yyyy 年份，与一个月份 mm       
						if (ContainerDateResult.type === 'arrayB') {
						    let [tContainerYear, tContainerMonth] = ContainerDateResult.values;
						
						    TaksData = TaksData.filter(task => {
						        // 针对 due 的匹配规则
						        const conditionDueYear = !tContainerYear || task.tDueYear === tContainerYear;
						        const conditionDueMonth = !tContainerMonth || task.tDueMonth === tContainerMonth;
						        const dueMatches = conditionDueYear && conditionDueMonth;
						
						        // 针对 scheduled 的匹配规则
						        const conditionScheduledYear = !tContainerYear || task.tScheduledYear === tContainerYear;
						        const conditionScheduledMonth = !tContainerMonth || task.tScheduledMonth === tContainerMonth;
						        const scheduledMatches = conditionScheduledYear && conditionScheduledMonth;
						
						        // 最终条件
						        return dueMatches || scheduledMatches;
						    });
							}
						
					// 03 - 分类处理 - 3 --  返回的为 C 类，  类似 ： [ 2024-07-14 ]  ; 里面只有1 个标准的 yyyy-mm-dd 日期 
						if (ContainerDateResult.type === 'arrayC') {
						    let tOnlyDate = ContainerDateResult.values[0];
						
						    TaksData = TaksData.filter(task => {
						        const conditionDueFullyDate = task.tDueFullyDate === tOnlyDate;
						        const conditionScheduledFullyDate = task.tScheduledFullyDate === tOnlyDate;
						        return conditionDueFullyDate || conditionScheduledFullyDate;
						    });
						}
			  
	    
	    return TaksData;    // 返回筛选后的 TaksData
		}

  // Row2 -- 03 --  全部未完成的 （即待分配安排) - 不管 due  | Scheduled 的 ）   
	  function NotDoneFilter(TaksData, SwitchNotDone) {
		    // 00 - 总结 
			  // --  没有日期筛选时，标准的 "未完成"，用的就是 completed 这个 key 的值，判断完成状态
			  // --  当然也可以用 status 为空，但算了，不太准，还要处理 string
			  // -- 叠加的日期筛选有 3类，是互斥关系 ，一次用一种即可   

		    // 01 -  强制转换为字符串并去除两边空格，忽略大小写
			    const filterCondition = String(SwitchNotDone).trim().toLowerCase();
			
			    if (!filterCondition.includes('true')) {
			        // SwitchNotDone 未定义、为空或不包含 'true'，保留所有的 item
			        return TaksData;
				    }
			
		    // 02 -  第1初次过滤，只保留 completed 为 false 的项
			    TaksData = cleanAllEmptyTasks(TaksData); 
			    TaksData = TaksData.filter(task => task.completed === false);
		
		    // 04 - 中文日期搜索搜索 （本质上也是去匹配哈  ）
			      let { ArrayOneYear, ArrayOneMonth, ArrayDay } = ChineseSwitch(DateSearch);
			      //dv.paragraph(ChineseSwitch(DateSearch));
			      
				  if (ArrayOneYear.length + ArrayOneMonth.length + ArrayDay.length > 0) {
					  TaksData = TaksData.filter(task => {
					    
			            const conditionDueYear = ArrayOneYear.length === 0 || (task.tDueYear && ArrayOneYear.includes(task.tDueYear));
			            const conditionDueMonth = ArrayOneMonth.length === 0 || (task.tDueMonth && ArrayOneMonth.includes(task.tDueMonth));
			            const conditionDueDay = ArrayDay.length === 0 || (task.tDueDay && ArrayDay.includes(task.tDueDay));
			            const dueMatches = conditionDueYear && conditionDueMonth && conditionDueDay;
			
			            const conditionScheduledYear = ArrayOneYear.length === 0 || (task.tScheduledYear && ArrayOneYear.includes(task.tScheduledYear));
			            const conditionScheduledMonth = ArrayOneMonth.length === 0 || (task.tScheduledMonth && ArrayOneMonth.includes(task.tScheduledMonth));
			            const conditionScheduledDay = ArrayDay.length === 0 || (task.tScheduledDay && ArrayDay.includes(task.tScheduledDay));
			            const scheduledMatches = conditionScheduledYear && conditionScheduledMonth && conditionScheduledDay;
		
		               return dueMatches || scheduledMatches;
				        });
					}
		    
			// 05 - 时间块  筛选：根据 Intervalday 进行筛选
				    let result = processIntervalday(Intervalday);
		
		
					//dv.paragraph( result.type);
					//dv.paragraph( result.values);
		
					if (result !== true) {
					    if (result.type === 'arrayA') {
					        const arrayA = result.values;
					        TaksData = TaksData.filter(task => {
					            const conditionDueFullyDate = arrayA.length === 0 || (task.tDueFullyDate && arrayA.includes(task.tDueFullyDate));
					            const conditionScheduledFullyDate = arrayA.length === 0 || (task.tScheduledFullyDate && arrayA.includes(task.tScheduledFullyDate));
					            return conditionDueFullyDate || conditionScheduledFullyDate;
					        });
					    }
					
					    if (result.type === 'arrayB') {
					        let [tLow, tUp] = result.values.sort();
					        TaksData = TaksData.filter(task => {
					            const conditionDueFullyDate = tLow <= task.tDueFullyDate && task.tDueFullyDate <= tUp;
					            const conditionScheduledFullyDate = tLow <= task.tScheduledFullyDate && task.tScheduledFullyDate <= tUp;
					            return conditionDueFullyDate || conditionScheduledFullyDate;
					        });
					    }
						}
		
			// 06 - 日期   容器筛选  
					
				// 01 - 接收  DateContainerStringCook ，此函数的参数  
					let ContainerDateResult = DateContainerStringCook(ContainerStartDateValue, ContainerEndDateValue, ContainerMonthDateValue, ContainerWeekDateValue);
				
				// 02 - 容错处理，如果 ContainerDateResult 的类型为 'none'，不过滤(就是指 ，日期系统容器，没选择哈  )
					if (ContainerDateResult.type === 'none') {
					    return TaksData;
					}
				
				// 03 - 分类处理 - 1 -- 返回 的为 A 类    类似 ：[2024-06-18, 2024-07-14  ]   ;  里面有2个标准的 yyyy-mm-dd 日期 
					if (ContainerDateResult.type === 'arrayA') {
					    let [tLow, tUp] = ContainerDateResult.values.sort();
					
					    TaksData = TaksData.filter(task => {
					        const conditionDueFullyDate = tLow <= task.tDueFullyDate && task.tDueFullyDate <= tUp;
					        const conditionScheduledFullyDate = tLow <= task.tScheduledFullyDate && task.tScheduledFullyDate <= tUp;
					        return conditionDueFullyDate || conditionScheduledFullyDate;
					    });
					}
				
				// 03 - 分类处理 - 2 -- 返回的为  B 类 ，类似  类似 ： [2024 ,  08 ]  ;  里面有2个标准的 yyyy 年份，与一个月份 mm       
					if (ContainerDateResult.type === 'arrayB') {
					    let [tContainerYear, tContainerMonth] = ContainerDateResult.values;
					
					    TaksData = TaksData.filter(task => {
					        // 针对 due 的匹配规则
					        const conditionDueYear = !tContainerYear || task.tDueYear === tContainerYear;
					        const conditionDueMonth = !tContainerMonth || task.tDueMonth === tContainerMonth;
					        const dueMatches = conditionDueYear && conditionDueMonth;
					
					        // 针对 scheduled 的匹配规则
					        const conditionScheduledYear = !tContainerYear || task.tScheduledYear === tContainerYear;
					        const conditionScheduledMonth = !tContainerMonth || task.tScheduledMonth === tContainerMonth;
					        const scheduledMatches = conditionScheduledYear && conditionScheduledMonth;
					
					        // 最终条件
					        return dueMatches || scheduledMatches;
					    });
						}
					
				// 03 - 分类处理 - 3 --  返回的为 C 类，  类似 ： [ 2024-07-14 ]  ; 里面只有1 个标准的 yyyy-mm-dd 日期 
					if (ContainerDateResult.type === 'arrayC') {
					    let tOnlyDate = ContainerDateResult.values[0];
					
					    TaksData = TaksData.filter(task => {
					        const conditionDueFullyDate = task.tDueFullyDate === tOnlyDate;
					        const conditionScheduledFullyDate = task.tScheduledFullyDate === tOnlyDate;
					        return conditionDueFullyDate || conditionScheduledFullyDate;
					    });
					}
		  
		
		    return TaksData;
			}

  // Row2 -- 04 --  循环任务 （未完成的）
		function RecurringFilter(TaksData, SwitchRecurring) {
		    // 容错处理：SwitchRecurring 强制转换为字符串并去除两边空格，忽略大小写
		    const filterCondition = String(SwitchRecurring).trim().toLowerCase();
		
		    // SwitchRecurring 未定义、为空或不包含 'true'，保留所有的 item
		    if (!filterCondition.includes('true')) {
		        return TaksData;
		    }
		
		    // 第1次过滤：只保留 completed 为 false 的项
		    TaksData = cleanAllEmptyTasks(TaksData); 
		    TaksData = TaksData.filter(task => task.completed === false);
		
		    // 第2次过滤：保留 text 包含 🔁 的项
		    TaksData = TaksData.filter(task => {
		        const text = task.text ? task.text.toString().trim().toLowerCase() : '';
		        return text.includes('🔁');
		    });
				
		
		    // 其他筛选 ...（此部分你可以自行添加其他过滤逻辑）
		
		    // 返回筛选后的 TaksData
		    return TaksData;
		}

  // Row2 -- 05 --  意外情况的 --  AnOtherFilter   - [？] 这种括号里面 有其他符号的 
		function AnOtherFilter(TaksData, SwitchAnOther) {
		    // 步骤1：处理 SwitchAnOther
		    SwitchAnOther = String(SwitchAnOther).trim().toLowerCase();
		    if (!SwitchAnOther || SwitchAnOther !== 'true') {
		        return TaksData;
		    }
		
		    // 步骤2：过滤掉已完成的任务
		    return TaksData.filter(task => {
		        // 检查任务是否已完成（completed 为 true）
		        if (task.completed === true) {
		            return false;
		        }
		
		        // 检查任务的 status 状态是否包含 'x'
		        if (task.status && task.status.includes('x')) {
		            return false;
		        }
		
		        // 步骤3：检查任务的 status 键的值
		        if (task.status) {
		            const statusLength = task.status.trim().length;
		            if (statusLength < 1) {
		                return false; // 如果 status 的长度小于 1，踢除任务
		            } else {
		                return true; // 如果 status 的长度大于等于 1，保留任务
		            }
		        }
		
		        return true; // 如果没有 status 键，保留任务
		    });
			}
	
		
	
	 // 07 -- 
	 // 07 -- 
	 // 07 -- 
	 // 07 -- 
	
  // Row2 -- 06 --  项目只完成了一部分  （ ProjectPartCompleted）
	 // （针对对象是-项目，即有子级，但是没有上级的任务，这样才是项目- 元始级哈）
	 // 判断 item 的   fullyCompleted  的值，如果  false  ，说明没有彻底完成 ；
	function ProjectPartCompletedFilter(TaksData, SwitchProjectPartCompleted) {
	    // 正常容错处理
    SwitchProjectPartCompleted = String(SwitchProjectPartCompleted).trim().toLowerCase();

	    // 如果 SwitchProjectPartCompleted 未定义、为空或不包含 'true'，保留所有的 item
	    if (!SwitchProjectPartCompleted || SwitchProjectPartCompleted !== 'true') {
	        return TaksData;
	    }
	
	    // 第一次过滤：键 project 的值 === false 的，从 TaksData 中踢除
		TaksData = cleanAllEmptyTasks(TaksData); 
	    TaksData = TaksData.filter(task => task.project === true);		
		
	    // 第二次过滤：键 completed === true 的，从 TaksData 中踢除
	    TaksData = TaksData.filter(task => task.completed !== true);
	
	    // 返回最终过滤后的数据
	    return TaksData;
	}

  // Row2 -- 07 --  项目只完成了一部分  （ ProjectPartCompleted）
	function WeekNotDoneFilter(TaksData, SwitchWeekNotDone) {
		    // 容错处理
		    SwitchWeekNotDone = String(SwitchWeekNotDone).trim().toLowerCase();
		
		    // 如果 SwitchWeekNotDone 未定义、为空或不包含 'true'，保留所有的 item
		    if (!SwitchWeekNotDone || !SwitchWeekNotDone.includes('true')) {
		        return TaksData;
		    }
		
		    // 第1次过滤：只保留 completed 为 false 的项
		    TaksData = cleanAllEmptyTasks(TaksData)   // 过滤空的  
		    TaksData = TaksData.filter(task => task.completed === false);
		
		    // 第2次过滤：只保留存在 due 这个 key 的项
		    TaksData = TaksData.filter(task => task.due !== undefined);
		
		    // 取得本周初始时间和本周周末时间
		    let { CurrentWeekFullyDateStart, CurrentWeekFullyDateEnd } = DateFilterPackage();
		
		    // 第3次过滤：只保留 due 在本周范围内的项
		    TaksData = TaksData.filter(task => {
		        let dueDate = new Date(task.due);
		        let startDate = new Date(CurrentWeekFullyDateStart);
		        let endDate = new Date(CurrentWeekFullyDateEnd);
		        return dueDate >= startDate && dueDate <= endDate;
		    });
		
		    // 返回最终过滤后的数据
		    return TaksData;
			}


 //  02 - text -- 任务的文本筛选  
		function TextFilter(TaksData, TextSearch) {
				// 容错处理：当 TextSearch 无定义或去除空格后为空值时，返回 TaksData
				    if (!TextSearch || TextSearch.trim().length === 0) {
				        return TaksData;
				    }
				
				// 调用 StringCook 函数处理 TextSearch
				    let TextSearchCookResult = StringCook(TextSearch);
				
				// 如果 TextSearchCookResult 为 true，表示没有筛选条件，返回 TaksData
				    if (TextSearchCookResult === true) {
				        return TaksData;
				    }
				
				// 获取 arrayA, arrayB, arrayC
				    let { arrayA, arrayB, arrayC } = TextSearchCookResult;
				
				// 转换字符串为小写并去除空格的辅助函数
				    function toLowerTrim(str) {
				        return str.toString().trim().toLowerCase();
				    }
				
				// 筛选 TaksData
				    return TaksData.filter(task => {
				        // 将 text 转换为小写并去除空格
				        let textString = toLowerTrim(task.text);
				
				// 检查 arrayA，如果有匹配则踢除
				        if (arrayA && arrayA.length > 0) {
				            for (let a of arrayA) {
				                if (textString.includes(toLowerTrim(a))) {
				                    return false;
				                }
				            }
				        }
				
				// 检查 arrayB，如果有匹配则保留
				        if (arrayB && arrayB.length > 0) {
				            for (let b of arrayB) {
				                if (textString.includes(toLowerTrim(b))) {
				                    return true;
				                }
				            }
				        }
				
				// 检查 arrayC，必须全部匹配
				        if (arrayC && arrayC.length > 0) {
				            for (let c of arrayC) {
				                if (!textString.includes(toLowerTrim(c))) {
				                    return false;
				                }
				            }
				            return true;
				        }
				
				// 如果所有数组都为空或没有匹配到 arrayB 或 arrayC，则保留
				        return true;
				    });
					}
 
 //  03 - tags 标签筛选  
	 function TagsFilter(TaksData, TagsSearch) {
			// 容错处理：当 TagsSearch 无定义或去除空格后为空值时，返回 TaksData
			    if (!TagsSearch || TagsSearch.trim().length === 0) {
			        return TaksData;
			    }
			
			// 调用 StringCook 函数处理 TagsSearch
			    let TagsSearchCookResult = StringCook(TagsSearch);
			
			// 如果 TagsSearchCookResult 为 true，表示没有筛选条件，返回 TaksData
			    if (TagsSearchCookResult === true) {
			        return TaksData;
			    }
			
			// 获取 arrayA, arrayB, arrayC
			    let { arrayA, arrayB, arrayC } = TagsSearchCookResult;
			
			// 转换字符串为小写并去除空格的辅助函数
			    function toLowerTrim(str) {
			        return str.toString().trim().toLowerCase();
			    }
			
			 // 筛选 TaksData
			    return TaksData.filter(task => {
			        // 将 tags 数组连接成一个字符串
			        let tagsString = task.tags.join(',').toLowerCase();
			
			// 检查 arrayA，如果有匹配则踢除
			        if (arrayA && arrayA.length > 0) {
			            for (let a of arrayA) {
			                if (tagsString.includes(toLowerTrim(a))) {
			                    return false;
			                }
			            }
			        }
			
			// 检查 arrayB，如果有匹配则保留
			        if (arrayB && arrayB.length > 0) {
			            for (let b of arrayB) {
			                if (tagsString.includes(toLowerTrim(b))) {
			                    return true;
			                }
			            }
			        }
			
			// 检查 arrayC，必须全部匹配
			        if (arrayC && arrayC.length > 0) {
			            for (let c of arrayC) {
			                if (!tagsString.includes(toLowerTrim(c))) {
			                    return false;
			                }
			            }
			            return true;
			        }
			
			// 如果所有数组都为空或没有匹配到 arrayB 或 arrayC，则保留
			        return true;
			    });
			}

 //  04 - HeadSection - 所属区域过滤函数 
		  function HeadSectionFilter(TaksData, HeadSectionSearch) {
				// 容错处理：当 HeadSectionSearch 无定义或去除空格后为空值时，返回 TaksData
				    if (!HeadSectionSearch || HeadSectionSearch.trim().length === 0) {
				        return TaksData;
				    }
				
				// 调用 StringCook 函数处理 HeadSectionSearch
				    let HeadSectionSearchCookResult = StringCook(HeadSectionSearch);
				
				// 如果 HeadSectionSearchCookResult 为 true，表示没有筛选条件，返回 TaksData
				    if (HeadSectionSearchCookResult === true) {
				        return TaksData;
				    }
				
				// 获取 arrayA, arrayB, arrayC
				    let { arrayA, arrayB, arrayC } = HeadSectionSearchCookResult;
				
				// 转换字符串为小写并去除空格的辅助函数
				    function toLowerTrim(str) {
				        return str.toString().trim().toLowerCase();
				    }
				
				// 筛选 TaksData
				    return TaksData.filter(task => {
				        let onlyHead = toLowerTrim(task.OnlyHead);
				
				// 检查 arrayA，如果有匹配则踢除
				        if (arrayA && arrayA.length > 0) {
				            for (let a of arrayA) {
				                if (onlyHead.includes(toLowerTrim(a))) {
				                    return false;
				                }
				            }
				        }
				
				// 检查 arrayB，如果有匹配则保留
				        if (arrayB && arrayB.length > 0) {
				            for (let b of arrayB) {
				                if (onlyHead.includes(toLowerTrim(b))) {
				                    return true;
				                }
				            }
				        }
				
				// 检查 arrayC，必须全部匹配
				        if (arrayC && arrayC.length > 0) {
				            for (let c of arrayC) {
				                if (!onlyHead.includes(toLowerTrim(c))) {
				                    return false;
				                }
				            }
				            return true;
				        }
				
				// 如果所有数组都为空或没有匹配到 arrayB 或 arrayC，则保留
				        return true;
				    });
				}

 //  05 - Path -- 路径过滤（这个不是文件名，是路径，路径，路径）
		function PathFilter(TaksData, PathSearch) {
			// 容错处理：当 PathSearch 无定义或去除空格后为空值时，返回 TaksData
			    if (!PathSearch || PathSearch.trim().length === 0) {
			        return TaksData;
			    }
			
			// 调用 StringCook 函数处理 PathSearch
			    let PathSearchCookResult = StringCook(PathSearch);
			
			// 如果 PathSearchCookResult 为 true，表示没有筛选条件，返回 TaksData
			    if (PathSearchCookResult === true) {
			        return TaksData;
			    }
			
			// 获取 arrayA, arrayB, arrayC
			    let { arrayA, arrayB, arrayC } = PathSearchCookResult;
			
			// 转换字符串为小写并去除空格的辅助函数
			    function toLowerTrim(str) {
			        return str.toString().trim().toLowerCase();
			    }
			
			// 筛选 TaksData
			    return TaksData.filter(task => {
			        let taskPath = toLowerTrim(task.path);
			
			        // 检查 arrayA，如果有匹配则踢除
			        if (arrayA && arrayA.length > 0) {
			            for (let a of arrayA) {
			                if (taskPath.includes(toLowerTrim(a))) {
			                    return false;
			                }
			            }
			        }
			
			        // 检查 arrayB，如果有匹配则保留
			        if (arrayB && arrayB.length > 0) {
			            for (let b of arrayB) {
			                if (taskPath.includes(toLowerTrim(b))) {
			                    return true;
			                }
			            }
			        }
			
			        // 检查 arrayC，必须全部匹配
			        if (arrayC && arrayC.length > 0) {
			            for (let c of arrayC) {
			                if (!taskPath.includes(toLowerTrim(c))) {
			                    return false;
			                }
			            }
			            return true;
			        }
			
			        
			        return true;    // 如果没有匹配到 arrayA   arrayB 或 arrayC，则就保留 ，因为你没有录哈  
			    });
				}

 //  06 - FileName -- 过滤函数 （这个就是 task 所在的 Page 的 文件名 ）   
		function FileNameFilter(TaksData, FileNameSearch) {
			// 容错处理：当 FileNameSearch 无定义或去除空格后为空值时，返回 TaksData
			    if (!FileNameSearch || FileNameSearch.trim().length === 0) {
			        return TaksData;
			    }
			
			// 调用 StringCook 函数处理 FileNameSearch
			    let FileNameSearchCookResult = StringCook(FileNameSearch);
			
			// 如果 FileNameSearchCookResult 为 true，表示没有筛选条件，返回 TaksData
			    if (FileNameSearchCookResult === true) {
			        return TaksData;
			    }
			
			// 获取 arrayA, arrayB, arrayC
			    let { arrayA, arrayB, arrayC } = FileNameSearchCookResult;
			
			// 转换字符串为小写并去除空格的辅助函数
			    function toLowerTrim(str) {
			        return str.toString().trim().toLowerCase();
			    }
			
			// 筛选 TaksData
			    return TaksData.filter(task => {
			        let fileName = toLowerTrim(task.FileName);
			
			        // 检查 arrayA，如果有匹配则踢除
			        if (arrayA && arrayA.length > 0) {
			            for (let a of arrayA) {
			                if (fileName.includes(toLowerTrim(a))) {
			                    return false;
			                }
			            }
			        }
			
			// 检查 arrayB，如果有匹配则保留
			        if (arrayB && arrayB.length > 0) {
			            for (let b of arrayB) {
			                if (fileName.includes(toLowerTrim(b))) {
			                    return true;
			                }
			            }
			        }
			
			// 检查 arrayC，必须全部匹配
			        if (arrayC && arrayC.length > 0) {
			            for (let c of arrayC) {
			                if (!fileName.includes(toLowerTrim(c))) {
			                    return false;
			                }
			            }
			            return true;
			        }
			
			// 如果所有数组都为空或没有匹配到 arrayB 或 arrayC，则保留
			        return true;
			    });
				}

// 容器类函数

	// 01 - 创建通用的 Flex 容器函数
       function createFlexContainer(cls, justifyContent, flexDirection = "row") {
         let container = document.createElement("div");
         //let container = document.createElement("div");
         container.className = cls;
         container.style.display = "flex";
         container.style.justifyContent = justifyContent;
         container.style.flexDirection = flexDirection;
         return container;
           }
	 
    // 02 - 文本输入框函数
	   function createInputField(placeholder, defaultValue) { 
	     const input = document.createElement("input", "");     // 创建输入框
	     input.type = "text";                                  // 设置输入框的类型
	     input.className = "input-field";                     // 设置输入框的 css 类型
	     input.placeholder = placeholder;      // 占位符，，就是"底层的提示语"
	     input.value = defaultValue;        // 设置，就是到时候你创建时，第2个参数就是此框的默认值
	     return input; 
	     }
 
    // 03 - 创建下拉选项框
		function createSelectField(options, defaultValue) {
		    const select = document.createElement("select");
		    select.className = "select-field";
		    
		    options.forEach(optionText => {
		        const option = document.createElement("option");
		        option.textContent = optionText; // 设置选项文本
		        option.value = optionText;
		        if (optionText === defaultValue) {
		            option.selected = true; // 设置默认选项
		        }
		        select.appendChild(option);
		    });
		    
		    return select;
		     }
  
    // 04 - 创建按钮-函数
		  function createButton(text) {
		    const button = dv.el("button", text);
		    button.className = "button";
		    return button;
		     }

// 筛选前提 ~ 主体部分 |即获取 | 筛选的部分  

 //  00  --  获取所有 task  清理掉空的 任务    
	//let TaksData = dv.pages().file.tasks.array()         // 获取所有 task 并存数组
	
	let TaksDataForCount = dv.pages().file.tasks.array().map(task => {
	    let page = dv.page(task.path);
	    let formattedCtime = formatFullDate(page.file.ctime);
	    let formattedMtime = formatFullDate(page.file.mtime);
		    return {
		        ...task,
		        ctime: formattedCtime,     // 我们是有把这个 Task 所在 Page 的 ctime \ mtime 也抓取了
		        mtime: formattedMtime,
			    };
		});

	//dv.paragraph(TaksDataForCount[2].ctime);
	//dv.paragraph(`底层时间是 : ${JSON.stringify(TaksDataForCount[2].ctime)}`);

	//dv.paragraph(TaksData.length);
	TaksDataForCount = TaksDataForCount.filter(task => task.text.length >=1);
	TaksDataForCount = TaksDataForCount.filter(task => task.text.trim() !== "");   // 清理掉空的任务
	TaksDataForCount = cleanAllEmptyTasks(TaksDataForCount)    // 递归清到子项空的任务 
	
	//dv.paragraph(TaksData.length);
	
    //let  aa =  ToDayDueFilter(TaksData, "true").length;
	//dv.paragraph(aa);
	
	// dv.paragraph(`没有处理之前的 : ${JSON.stringify(TaksData[10])}`);
	
 //  01 -- 增加 key  -- 目前是3个 ~   FileName    |    OnlyHead |   Project  | 一堆日期 key 
	// FileName ~ 用于筛选的；，还可以跳转链接 
	// OnlyHead  ~ 仅用于筛选
	// Projcet  ~ 判断是否是父子项的任务，true 就是项目任务有父子级；  也是后期用于筛选的   
	//  
	//  tDueFullyDate,    tDueYear,   tDueMonth,   tDueDay,
    //  tScheduledFullyDate,   tScheduledYear,    tScheduledMonth,     tScheduledDay,
    //  tCompletionFullyDate,  tCompletionYear,    tCompletionMonth,   tCompletionDay
    //  以上的日期 ，都是拆了的；完整的日期 也是转换成标准 yyyy-mm-dd 格式了的  
    //  以上是全部增加到单个 task 里面了的，我是说如果有的话； 



	TaksDataForCount = AddKeyForTasks(TaksDataForCount);        
	TaksDataForCount = TaksDataForCount.map(addDateKeysToTask);     // 把  due, scheduled， completion 日期拆解转换


	//dv.paragraph(ToDayDueFilter(TaksData, "true").length);


// CSS 样式定义
	const style = document.createElement('style');
	
	style.textContent = `
	

	    .mainContainer {
		     display: flex;
		     flex-direction: column;       /* 垂直排列 */
		     gap: 13px;                   /* 行间距 */
		     padding: 8px;            /* 设置容器内边距 */
		     height: 100%;        /* 设置容器高度，例如 100% */
		     width: 100%;          /* 设置容器宽度，例如 100% */
		     /* background-color: #f9f9f9 ;  设置容器背景颜色 */
		     overflow: auto;        /* 如果内容溢出，添加滚动条 */
		     border-radius: 0px;    /* 设置容器圆角 */
		     border: 1px solid #ccc ;
	    }
	    
		 .btn-04 {
			  display: flex;      /* 设置为弹性盒布局 */
			  flex-direction: column;
			  align-items: center;
			  background-image: linear-gradient(144deg, #AF40FF , #5B42F3 70%, #00DDEB );	  
			  border-radius: 8px;
			  box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
			  box-sizing: border-box;
			  color: #FFFFFF ;
			  display: flex;			  
			  font-size: 23px;
			  justify-content: center;			  
			  width: 115px;
			  height: 60px;        /* 设置容器高度，例如 100% */
			  padding: 3px;
			  white-space: nowrap;
			  cursor: pointer;
			  transition: all .3s;			  
			  margin: 4px 6px;      /* 顺序为：上 右 下 左 */
		 }

		.btn-04.hover {
		    outline: 0;		    
		    background-image: none; /* 去掉渐变背景 */
		    background-color: #efc509 ; /* 浅蓝色背景 */
			}

		.btn-04:active {
		    transform: scale(0.5);  /* 点击时缩放效果 */
		    background-image: none; /* 去掉渐变背景 */
		}
		
		.btn-04.active {
		    background-image: none; /* 去掉渐变背景 */
		    background-color: #36394c ; /* 激活状态背景色 */
		    border: 2px solid #fff200 ; /* 激活状态边框颜色 */
		}



		 .btn-04 span {
			  align-items: center;
			  font-size: 22px
			  background-color: rgb(5, 6, 45);
			  text-align: center; /* 确保文本居中对齐 */
			  padding: 15px 24px;
			  border-radius: 6px;
			  width: 100%;
			  height: 60px;
			  font-weight: bold;
			  transition: 300ms;
			  display: block; /* 确保 span 元素是块级元素 */
			  margin-top:-22px; /* 调整这里的数值来改变间距 */
			  margin-bottom: -30px; /* 调整这里的数值来改变间距 */
			  margin-left: -10x; /* 调整这里的数值来改变间距 */
		 }

	    .btn-04 span:nth-child(2) {
	         font-size: 15px; /* 任务数量的字体大小 */
	         color: white; /* 任务数量的字体颜色 */
	         font-weight: normal;
	         margin-top: -1px; /* 调整这里的数值来改变间距 */
	         text-align: center; /* 确保文本居中对齐 */
	         margin-left: 0x; /* 调整这里的数值来改变间距 */
         }
	    

		


		
		
	    .label-row3-Month {
	        font-size: 16px; /* 字体大小 */
	        color: yellow; /* 字体颜色 */
	        margin-right:5px;   /* 与输入框的间距 */
	        margin-left: 10px;    /* 左侧间距 */ 
	        width:70px;          /* 设置容器宽度，例如 100% */
	        display: flex;
	        align-items: center; /* 垂直对齐 */
	        margin-top:10px; /* 调整这里的数值来改变间距 */	        
	    }


		.MonthContainer {
		    height: 30px; /* 调整容器高度 */
		    width: 120px; /* 调整容器宽度 */
		    border: 1px solid #ccc ; /* 边框宽度和颜色 */
		    border-radius: 5px; /* 边框圆角 */
		    padding: 5px; /* 内边距 */
		    margin-top:10px; /* 调整这里的数值来改变间距 */	        
		    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 阴影效果 */
		    /* background-color: #fff ; 背景颜色 */
		    color: #00ffff ; /* 文字颜色 */
		    font-size: 16px; /* 文字大小 */
		    outline: none; /* 去除默认的选中样式 */
		}

		.MonthContainer:focus {
		    border-color: #007bff ; /* 聚焦时的边框颜色 */
		    box-shadow: 0 0 8px rgba(0, 123, 255, 0.5); /* 聚焦时的阴影效果 */
		}

	    .label-row3-Week {
	        font-size: 16px; /* 字体大小 */
	        color: yellow; /* 字体颜色 */
	        margin-right:0px;   /* 与输入框的间距 */
	        margin-left: 20px;    /* 左侧间距 */ 
	        width:70px;          /* 设置容器宽度，例如 100% */
	        display: flex;
	        align-items: center; /* 垂直对齐 */
	        margin-top:10px; /* 调整这里的数值来改变间距 */	        
	    }

		.WeekContainer {
		    height: 30px; /* 调整容器高度 */
		    width: 120px; /* 调整容器宽度 */
		    border: 1px solid #ccc ; /* 边框宽度和颜色 */
		    border-radius: 5px; /* 边框圆角 */
		    padding: 5px; /* 内边距 */
		    margin-top:10px; /* 调整这里的数值来改变间距 */	        
		    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 阴影效果 */
		    /* background-color: #fff ; 背景颜色 */
		    color: #00ffff ; /* 文字颜色 */
		    font-size: 16px; /* 文字大小 */
		    outline: none; /* 去除默认的选中样式 */
		}

		.WeekContainer:focus {
		    border-color: #007bff ; /* 聚焦时的边框颜色 */
		    box-shadow: 0 0 8px rgba(0, 123, 255, 0.5); /* 聚焦时的阴影效果 */
		}

		.label-row3-DayStart {
	        font-size: 16px; /* 字体大小 */
	        color: yellow; /* 字体颜色 */
	        margin-right:10px;   /* 与输入框的间距 */
	        margin-left: 30px;    /* 左侧间距 */ 
	        width:80px;          /* 设置容器宽度，例如 100% */
	        display: flex;
	        align-items: center; /* 垂直对齐 */
	        margin-top:10px; /* 调整这里的数值来改变间距 */	        
	    }   

		.label-row3-DayEnd {
	        font-size: 16px; /* 字体大小 */
	        color: yellow; /* 字体颜色 */
	        margin-right:10px;   /* 与输入框的间距 */
	        margin-left: 30px;    /* 左侧间距 */ 
	        width:80px;          /* 设置容器宽度，例如 100% */
	        display: flex;
	        align-items: center; /* 垂直对齐 */
	        margin-top:10px; /* 调整这里的数值来改变间距 */	        
	    }   
	    
		
		.DayContainer {
		    height: 30px; /* 调整容器高度 */
		    width: 120px; /* 调整容器宽度 */
		    border-radius: 5px; /* 边框圆角 */
		    padding: 5px; /* 内边距 */
		    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 阴影效果 */		    
		    color: #333 ; /* 文字颜色 */
		    font-size: 16px; /* 文字大小 */
		    outline: none; /* 去除默认的选中样式 */
		    margin-top:10px; /* 调整这里的数值来改变间距 */	
		    border: 1px solid #63aa53 ; /* 白色边框 *
      		background-color: #333333 ; /* 深色背景 */
		}
		
		.DayContainer:focus {
		    border-color: #007bff ; /* 聚焦时的边框颜色 */
		    box-shadow: 0 0 8px rgba(0, 123, 255, 0.5); /* 聚焦时的阴影效果 */
		}
		
		.label-row4-01-ChineseSearch {
	        font-size: 16px; /* 字体大小 */
	        color: yellow; /* 字体颜色 */
	        margin-right: 3px;   /* 与输入框的间距 */
	        margin-left: 10px;    /* 左侧间距 */ 
	        width: 70px;          /* 设置容器宽度，例如 100% */
	        display: flex;
	        align-items: center; /* 垂直对齐 */
	        margin-top:10px; /* 调整这里的数值来改变间距 */	
	    }
	    
		.inputFilter-row4-01-ChineseSearch {
	        padding: 4px;
	        width: 280px;          /* 设置容器宽度，例如 100% */
	        border: 1px solid  #ffffff ; /* 更粗的边框和更深的颜色 */
	        margin-left: 3px;   /* 左边距 */
	        margin-right: 10px;  /* 右边距 */
	        border-radius: 4px;
	        margin-top:13px; /* 调整这里的数值来改变间距 */	
	        box-shadow: 0 0 2px #ffffff ; /* 添加阴影使边框更明显 */
	    }

		.label-row4-02-DateBlock {
	        font-size: 16px; /* 字体大小 */
	        color: yellow; /* 字体颜色 */
	        margin-right: 3px;   /* 与输入框的间距 */
	        margin-left: 20px;    /* 左侧间距 */ 
	        width: 70px;          /* 设置容器宽度，例如 100% */
	        display: flex;
	        align-items: center; /* 垂直对齐 */
	        margin-top:10px; /* 调整这里的数值来改变间距 */	
	    }
	    
		.inputFilter-row4-02-DateBlock {
	        padding: 4px;
	        width: 280px;          /* 设置容器宽度，例如 100% */
	        border: 1px solid  #ffffff ; /* 更粗的边框和更深的颜色 */
	        margin-left: 3px;   /* 左边距 */
	        margin-right: 10px;  /* 右边距 */
	        border-radius: 4px;
	        margin-top:13px; /* 调整这里的数值来改变间距 */	
	        box-shadow: 0 0 2px #ffffff ; /* 添加阴影使边框更明显 */
	        
	    }

		.button-Clear {
		    box-sizing: border-box;
	        background-color: #007BFF ;
	        color: white;
	        cursor: pointer;
	        width: 120px;          /* 设置容器宽度，例如 100% */
	        padding: 10px 20px; /* 确保按钮内填充一致 */
	        border: none; /* 确保没有边框变化 */
	        
	        display: inline-block; /* 保持按钮内联块状 */
	         /* width: auto; 保持自动宽度 */
	        line-height: 0; /* 设置行高，确保文本垂直居中 */
	        margin-top:13px; /* 调整这里的数值来改变间距 */
	        margin-right: 0px;  /* 右边距 */	
	        margin-left: 20px;   /* 左边距 */
	        border: 1px solid #63aa53 ; /* 白色边框 *
            background-color: #333333 ; /* 深色背景 */
		}
		
		.button-Clear:hover {
		    background-color: #0056b3 ;
		    padding: 10px 20px;    /* 确保悬停时填充一致 */
		    border: none;          /* 确保悬停时没有边框变化 */	    
	        width: 120px;          /* 设置容器宽度，例如 100% */
	        /*width: auto;保持自动宽度  */	       
		    
		}


		.label-Row5-Text {
	        font-size: 14px; /* 字体大小 */
	        color: yellow; /* 字体颜色 */
	        margin-right: 3px;   /* 与输入框的间距 */
	        margin-left: 10px;    /* 左侧间距 */ 
	        width: 70px;          /* 设置容器宽度，例如 100% */
	        display: flex;
	        align-items: center; /* 垂直对齐 */
	        margin-top:10px; /* 调整这里的数值来改变间距 */	
	    }
	    
		.input-Row5-Text {
	        padding: 4px;
	        width: 158px;          /* 设置容器宽度，例如 100% */
	        border: 1px solid  #ffffff ; /* 更粗的边框和更深的颜色 */
	        margin-left: 3px;   /* 左边距 */
	        margin-right: 10px;  /* 右边距 */
	        border-radius: 4px;
	        margin-top:13px; /* 调整这里的数值来改变间距 */	
	        box-shadow: 0 0 2px #ffffff ; /* 添加阴影使边框更明显 */
	    }


		.label-row6-StringSort-Option {
	        font-size: 15px; /* 字体大小 */
	        color: yellow; /* 字体颜色 */
	        margin-right: 5px;   /* 与输入框的间距 */
	        margin-left: 10px;    /* 左侧间距 */ 
	        width: 95px;          /* 设置容器宽度，例如 100% */
	        display: flex;
	        align-items: center; /* 垂直对齐 */
	        margin-top:15px; /* 调整这里的数值来改变间距 */	
	    }
	    
		.select-row6-StringSort-Option {        
			font-size: 19 px; /* 调整字体大小 */
			color: white;
			line-height: 2;       /* 设置行高，确保文字垂直居中 */
			width: 145px;          /* 设置容器宽度，例如 100% */
			margin-left: 2px;    /* 左侧间距 */
			margin-right: 5px;   /* 与输入框的间距 */
			padding: 3px;         /* 设置内边距 */
			border: 0px solid #ccc ;    /* 设置边框 */
			border-radius: 5px;       /* 设置圆角 */			
			box-sizing: border-box; /* 确保内边距和边框包括在总宽度和高度内 */
			text-align: center; /* 文本居中对齐 */
			border: 1px solid #63aa53 ; /* 白色边框 */
	        margin-top:16px; /* 调整这里的数值来改变间距 */   
	        background-color: #333333 ; /* 深色背景 */     
	    }


	    
		.select-row6-StringSort-Order {        
			font-size: 19 px; /* 调整字体大小 */
			color: white;
			line-height: 2;       /* 设置行高，确保文字垂直居中 */
			width: 100px;          /* 设置容器宽度，例如 100% */
			margin-left: 2px;    /* 左侧间距 */
			margin-right: 5px;   /* 与输入框的间距 */
			padding: 3px;         /* 设置内边距 */
			border: 0px solid #ccc ;    /* 设置边框 */
			border-radius: 5px;       /* 设置圆角 */			
			box-sizing: border-box; /* 确保内边距和边框包括在总宽度和高度内 */
			text-align: center; /* 文本居中对齐 */
	        margin-top:16px; /* 调整这里的数值来改变间距 */   
			border: 1px solid #63aa53 ; /* 白色边框 *
		    background-color: #333333 ; /* 深色背景 */    
	    }

		.label-row6-DateSort-Option {
	        font-size: 16px; /* 字体大小 */
	        color: yellow; /* 字体颜色 */
	        margin-right:10px;   /* 与输入框的间距 */
	        margin-left: 10px;    /* 左侧间距 */ 
	        width: 95px;          /* 设置容器宽度，例如 100% */
	        display: flex;
	        align-items: center; /* 垂直对齐 */
	        margin-top:15px; /* 调整这里的数值来改变间距 */		
	        
	    }
	    
		.select-row6-DateSort-Option {        
			font-size: 19 px; /* 调整字体大小 */
			color: white;
			line-height: 2;       /* 设置行高，确保文字垂直居中 */
			width: 145px;          /* 设置容器宽度，例如 100% */
			margin-left: -20px;    /* 左侧间距 */
			margin-right: 5px;   /* 与输入框的间距 */
			padding: 3px;         /* 设置内边距 */
			border: 0px solid #ccc ;    /* 设置边框 */
			border-radius: 5px;       /* 设置圆角 */			
			box-sizing: border-box; /* 确保内边距和边框包括在总宽度和高度内 */
			text-align: center; /* 文本居中对齐 */
			margin-top:16px; /* 调整这里的数值来改变间距 */  
			border: 1px solid #63aa53 ; /* 白色边框 *
   background-color: #333333 ; /* 深色背景 */    
	             
	    }
	    
		.select-row6-DateSort-Order {        
			font-size: 19 px; /* 调整字体大小 */
			color: white;
			line-height: 2;       /* 设置行高，确保文字垂直居中 */
			width: 75px;          /* 设置容器宽度，例如 100% */
			margin-left: 2px;    /* 左侧间距 */
			margin-right: 5px;   /* 与输入框的间距 */
			padding: 3px;         /* 设置内边距 */
			border: 0px solid #ccc ;    /* 设置边框 */
			border-radius: 5px;       /* 设置圆角 */			
			box-sizing: border-box; /* 确保内边距和边框包括在总宽度和高度内 */
			text-align: center; /* 文本居中对齐 */
	        margin-top:16px; /* 调整这里的数值来改变间距 */      
	        border: 1px solid #63aa53 ; /* 白色边框 *
            background-color: #333333 ; /* 深色背景 */ 
	    }



		.label-row6-Group {
	        font-size: 16px; /* 字体大小 */
	        color: yellow; /* 字体颜色 */
	        margin-right: 3px;   /* 与输入框的间距 */
	        margin-left: 10px;    /* 左侧间距 */ 
	        width: 75px;          /* 设置容器宽度，例如 100% */
	        display: flex;
	        align-items: center; /* 垂直对齐 */
	        margin-top:15px; /* 调整这里的数值来改变间距 */	
	    }
	    
		.select-row6-Group {        
			font-size: 19 px; /* 调整字体大小 */
			color: white;
			line-height: 2;       /* 设置行高，确保文字垂直居中 */
			width: 115px;          /* 设置容器宽度，例如 100% */
			margin-left: 2px;    /* 左侧间距 */
			margin-right: 5px;   /* 与输入框的间距 */
			padding: 3px;         /* 设置内边距 */
			border: 0px solid #ccc ;    /* 设置边框 */
			border-radius: 5px;       /* 设置圆角 */			
			box-sizing: border-box; /* 确保内边距和边框包括在总宽度和高度内 */
			text-align: center; /* 文本居中对齐 */
	        margin-top:16px; /* 调整这里的数值来改变间距 */    
	        border: 1px solid #63aa53 ; /* 白色边框 *
            background-color: #333333 ; /* 深色背景 */    
	    }




	`;
	
	document.head.appendChild(style);


// 创建 所有的  容器  -6排
	const mainContainer = createFlexContainer("center", "column");
	mainContainer.className = "mainContainer"; 

 // row1 - 创建第01排 容器布局  
   const row1 = createFlexContainer("flex-row", "flex-start");

  // row1 - 01 - 创建+添加 "ToDo-今天截止"  （带追踪事件）
	const ToDayDuetextSpan = document.createElement('span');    // 创建一个文本容器 | 存按钮名
	ToDayDuetextSpan.textContent = '今天到期';
	 
	const ToDayDuecountSpan = document.createElement('span');   // 创建一个文本容器 | 存数量
	ToDayDuecountSpan.textContent = ToDayDueFilter(TaksDataForCount, "true").length;
	
	const ToDayDueButton = document.createElement('button');		
	ToDayDueButton.className = buttonClassName;  // 单独设置类名
	ToDayDueButton.addEventListener('click', () => {     // 添加事件监听器
		
	    // 事件处理逻辑
	    ToDayDueButton.classList.add('active');

		OverDueButton.classList.remove('active');
		HaveDueButton.classList.remove('active');
		HaveScheduledButton.classList.remove('active');
		DoneButton.classList.remove('active');
		ProjectfullyCompletedButton.classList.remove('active');
		MonthNotDoneButton.classList.remove('active');
		
		WaitingToDoButton.classList.remove('active');
		GoleNotDoneButton.classList.remove('active');
		NotDoneButton.classList.remove('active');
		RecurringButton.classList.remove('active');
		AnOtherButton.classList.remove('active');
		ProjectPartCompletedButton.classList.remove('active');
		WeekNotDoneButton.classList.remove('active');
	
	    SwitchToDayDue = "true";
	    
	    SwitchOverDue  =  "false" ;  		
		SwitchHaveDue = "false" ;        
		SwitchHaveScheduled = "false" ;   			
		SwitchDone  = "false" ;      
		SwitchProjectfullyCompleted = "false" ;    
		SwitchMonthNotDone = "false"; 
		 
		SwitchWaitingToDoList = "false" ;
		SwitchGoleNotDone  = "false"; 			
		SwitchNotDone = "false" ; 
		SwitchRecurring  = "false"; 			
		SwitchAnOther  = "false" ;   
		SwitchProjectPartCompleted  = "false";
		SwitchWeekNotDone  = "false"; 
		
		DateSearch = "" ;         
		Intervalday = ""  ;  
		inputChineseSearch.value = "" ;
		inputDateBlockFilter.value  = "" ;
		
		ContainerStartDateValue = "";
		ContainerEndDateValue = "";    
		ContainerMonthDateValue = "";   
		ContainerWeekDateValue = ""; 
		
		startdateInput.value = ""
		enddateInput.value = "";	
		weekDateInput.value=  "";
		monthDateInput.value= "";

			    
	    TaskFilterShow();
	});
	ToDayDueButton.appendChild(ToDayDuecountSpan);
	ToDayDueButton.appendChild(ToDayDuetextSpan);
	  
  // row1 - 02 - 创建+添加 "OverDue - 已超期"  （带追踪事件）
	const OverDuetextSpan = document.createElement('span');    // 创建一个文本容器 | 存按钮名
	OverDuetextSpan.textContent = '已经超期';
	
	const OverDuecountSpan = document.createElement('span');   // 创建一个文本容器 | 存数量
	OverDuecountSpan.textContent = OverDueFilter(TaksDataForCount, "true").length;     

	const OverDueButton = document.createElement('button');		
	OverDueButton.className = buttonClassName; // 单独设置类名
	OverDueButton.addEventListener('click', () => {     // 添加事件监听器
	    // 事件处理逻辑
		OverDueButton.classList.add('active');
		
		ToDayDueButton.classList.remove('active');
		HaveDueButton.classList.remove('active');
		HaveScheduledButton.classList.remove('active');
		DoneButton.classList.remove('active');
		ProjectfullyCompletedButton.classList.remove('active');
		MonthNotDoneButton.classList.remove('active');
		
		WaitingToDoButton.classList.remove('active');
		GoleNotDoneButton.classList.remove('active');
		NotDoneButton.classList.remove('active');
		RecurringButton.classList.remove('active');
		AnOtherButton.classList.remove('active');
		ProjectPartCompletedButton.classList.remove('active');
		WeekNotDoneButton.classList.remove('active');


	    SwitchOverDue = "true";
	    
		SwitchToDayDue = "false";
		SwitchHaveDue = "false" ;        
		SwitchHaveScheduled = "false" ; 
		SwitchDone  = "false" ;      
		SwitchProjectfullyCompleted = "false" ;
		SwitchMonthNotDone = "false"; 
		     
		SwitchWaitingToDoList = "false" ;
		SwitchGoleNotDone  = "false"; 			
		SwitchNotDone = "false" ; 
		SwitchRecurring  = "false"; 			
		SwitchAnOther  = "false" ;   
		SwitchProjectPartCompleted  = "false";
		SwitchWeekNotDone  = "false"; 

		DateSearch = "" ;         
		Intervalday = ""  ;  
		inputChineseSearch.value = "" ;
		inputDateBlockFilter.value  = "" ;
		
		ContainerStartDateValue = "";
		ContainerEndDateValue = "";    
		ContainerMonthDateValue = "";   
		ContainerWeekDateValue = ""; 
		
		startdateInput.value = ""
		enddateInput.value = "";	
		weekDateInput.value=  "";
		monthDateInput.value= "";

	    TaskFilterShow();

    
	});
	OverDueButton.appendChild(OverDuecountSpan);
	OverDueButton.appendChild(OverDuetextSpan);
 
  // row1 - 03 - 创建+添加 "HaveDue - 有截止日期的"  （带追踪事件）
	const HaveDuetextSpan = document.createElement('span');    // 创建一个文本容器 | 存按钮名
	HaveDuetextSpan.textContent = '有截止日期';
	
	const HaveDuecountSpan = document.createElement('span');   // 创建一个文本容器 | 存数量
	HaveDuecountSpan.textContent = HaveDueFilter(TaksDataForCount, "true").length;     

	const HaveDueButton = document.createElement('button');		
	HaveDueButton.className = buttonClassName; // 单独设置类名
	HaveDueButton.addEventListener('click', () => {     // 添加事件监听器

	
		HaveDueButton.classList.add('active');
	                
		ToDayDueButton.classList.remove('active');
		OverDueButton.classList.remove('active');
		
		HaveScheduledButton.classList.remove('active');
		DoneButton.classList.remove('active');
		ProjectfullyCompletedButton.classList.remove('active');
		MonthNotDoneButton.classList.remove('active');
		
		WaitingToDoButton.classList.remove('active');
		GoleNotDoneButton.classList.remove('active');
		NotDoneButton.classList.remove('active');
		RecurringButton.classList.remove('active');
		AnOtherButton.classList.remove('active');
		ProjectPartCompletedButton.classList.remove('active');
		WeekNotDoneButton.classList.remove('active');


	    SwitchHaveDue = "true" ;        

		SwitchToDayDue = "false";
		SwitchOverDue  =  "false" ;  
		SwitchHaveScheduled = "false" ;    	
		SwitchDone  = "false" ;      
		SwitchProjectfullyCompleted = "false" ;  
		SwitchMonthNotDone = "false";    
		
		SwitchWaitingToDoList = "false" ;
		SwitchGoleNotDone  = "false"; 	
		SwitchNotDone = "false" ; 
		SwitchRecurring  = "false"; 	
		SwitchAnOther  = "false" ;   
		SwitchProjectPartCompleted  = "false";
		SwitchWeekNotDone  = "false"; 
		
		DateSortOption = "due";

		DateSearch = "" ;         
		Intervalday = ""  ;  
		inputChineseSearch.value = "" ;
		inputDateBlockFilter.value  = "" ;
		
		ContainerStartDateValue = "";
		ContainerEndDateValue = "";    
		ContainerMonthDateValue = "";   
		ContainerWeekDateValue = ""; 
		
		startdateInput.value = ""
		enddateInput.value = "";	
		weekDateInput.value=  "";
		monthDateInput.value= "";

		TaskFilterShow();
    
	});
	HaveDueButton.appendChild(HaveDuecountSpan);
	HaveDueButton.appendChild(HaveDuetextSpan);

  // row1 - 04 - 创建+添加 "HaveScheduled- 有预计做的|安排日期的"  （带追踪事件）
	const HaveScheduledtextSpan = document.createElement('span');    // 创建一个文本容器 | 存按钮名
	HaveScheduledtextSpan.textContent = '已安排';
	
	const HaveScheduledcountSpan = document.createElement('span');   // 创建一个文本容器 | 存数量
	HaveScheduledcountSpan.textContent = HaveScheduledFilter(TaksDataForCount, "true").length;     

	const HaveScheduledButton = document.createElement('button');		
	HaveScheduledButton.className = buttonClassName; // 单独设置类名
	HaveScheduledButton.addEventListener('click', () => {     // 添加事件监听器
	    // 事件处理逻辑
		HaveScheduledButton.classList.add('active');

		ToDayDueButton.classList.remove('active');
		OverDueButton.classList.remove('active');		
		HaveDueButton.classList.remove('active');
		DoneButton.classList.remove('active');
		ProjectfullyCompletedButton.classList.remove('active');
		MonthNotDoneButton.classList.remove('active');
		
		WaitingToDoButton.classList.remove('active');
		GoleNotDoneButton.classList.remove('active');
		NotDoneButton.classList.remove('active');
		RecurringButton.classList.remove('active');
		AnOtherButton.classList.remove('active');
		ProjectPartCompletedButton.classList.remove('active');
		WeekNotDoneButton.classList.remove('active');

	    SwitchHaveScheduled = "true" ;    

		SwitchToDayDue = "false";
		SwitchOverDue  =  "false" ;  
		SwitchHaveDue = "false" ;    	
		SwitchDone  = "false" ;      
		SwitchProjectfullyCompleted = "false" ;    
		SwitchMonthNotDone = "false";  
		
		SwitchWaitingToDoList = "false" ;
		SwitchGoleNotDone  = "false"; 	
		SwitchNotDone = "false" ; 
		SwitchRecurring  = "false"; 	
		SwitchAnOther  = "false" ;   
		SwitchProjectPartCompleted  = "false";		
		SwitchWeekNotDone  = "false"; 

		DateSearch = "" ;         
		Intervalday = ""  ;  
		inputChineseSearch.value = "" ;
		inputDateBlockFilter.value  = "" ;
		
		ContainerStartDateValue = "";
		ContainerEndDateValue = "";    
		ContainerMonthDateValue = "";   
		ContainerWeekDateValue = ""; 
		
		startdateInput.value = ""
		enddateInput.value = "";	
		weekDateInput.value=  "";
		monthDateInput.value= "";

		DateSortOption = "scheduled";
		
		TaskFilterShow();
    
	});
	HaveScheduledButton.appendChild(HaveScheduledcountSpan);
	HaveScheduledButton.appendChild(HaveScheduledtextSpan);

  // row1 - 05 - 创建+添加 "Done -- 已经完成啦"  （带追踪事件）
	const DonetextSpan = document.createElement('span');    // 创建一个文本容器 | 存按钮名
	DonetextSpan.textContent = '已完成';
	
	const DonecountSpan = document.createElement('span');   // 创建一个文本容器 | 存数量
	DonecountSpan.textContent = DoneFilter(TaksDataForCount, "true").length;     

	const DoneButton = document.createElement('button');		
	DoneButton.className = buttonClassName; // 单独设置类名
	DoneButton.addEventListener('click', () => {     // 添加事件监听器
	    // 事件处理逻辑
		DoneButton.classList.add('active');

		ToDayDueButton.classList.remove('active');
		OverDueButton.classList.remove('active');		
		HaveDueButton.classList.remove('active');
		HaveScheduledButton.classList.remove('active');		
		ProjectfullyCompletedButton.classList.remove('active');
		MonthNotDoneButton.classList.remove('active');
		
		WaitingToDoButton.classList.remove('active');
		GoleNotDoneButton.classList.remove('active');
		NotDoneButton.classList.remove('active');
		RecurringButton.classList.remove('active');
		AnOtherButton.classList.remove('active');
		ProjectPartCompletedButton.classList.remove('active');
		WeekNotDoneButton.classList.remove('active');

	    SwitchDone  = "true" ;      

		SwitchToDayDue = "false";
		SwitchOverDue  =  "false" ;  
		SwitchHaveDue = "false" ;    	
		SwitchHaveScheduled = "false" ;    
		SwitchProjectfullyCompleted = "false" ;     
		SwitchMonthNotDone = "false"; 
		
		SwitchWaitingToDoList = "false" ;
		SwitchGoleNotDone  = "false"; 	
		SwitchNotDone = "false" ; 
		SwitchRecurring  = "false"; 	
		SwitchAnOther  = "false" ;   
		SwitchProjectPartCompleted  = "false";		
		SwitchWeekNotDone  = "false"; 

		DateSearch = "" ;         
		Intervalday = ""  ;  
		inputChineseSearch.value = "" ;
		inputDateBlockFilter.value  = "" ;
		
		ContainerStartDateValue = "";
		ContainerEndDateValue = "";    
		ContainerMonthDateValue = "";   
		ContainerWeekDateValue = ""; 
		
		startdateInput.value = ""
		enddateInput.value = "";	
		weekDateInput.value=  "";
		monthDateInput.value= "";

		DateSortOption = "completion";
		
		TaskFilterShow();

    
	});
	DoneButton.appendChild(DonecountSpan);
	DoneButton.appendChild(DonetextSpan);

  // row1 - 06 - 创建+添加 "项目全部完成 -   ProjectfullyCompleted "  （带追踪事件）
	const ProjectfullyCompletedtextSpan = document.createElement('span');    // 创建一个文本容器 | 存按钮名
	ProjectfullyCompletedtextSpan.textContent = '项目已完成';
	
	const ProjectfullyCompletedcountSpan = document.createElement('span');   // 创建一个文本容器 | 存数量
	ProjectfullyCompletedcountSpan.textContent = ProjectfullyCompletedFilter(TaksDataForCount, "true").length;     

	const ProjectfullyCompletedButton = document.createElement('button');		
	ProjectfullyCompletedButton.className = buttonClassName; // 单独设置类名
	ProjectfullyCompletedButton.addEventListener('click', () => {     // 添加事件监听器
	    // 事件处理逻辑
		
		ProjectfullyCompletedButton.classList.add('active');		

		ToDayDueButton.classList.remove('active');
		OverDueButton.classList.remove('active');		
		HaveDueButton.classList.remove('active');
		HaveScheduledButton.classList.remove('active');		
		DoneButton.classList.remove('active');
		MonthNotDoneButton.classList.remove('active');
		
		WaitingToDoButton.classList.remove('active');
		GoleNotDoneButton.classList.remove('active');
		NotDoneButton.classList.remove('active');
		RecurringButton.classList.remove('active');
		AnOtherButton.classList.remove('active');
		ProjectPartCompletedButton.classList.remove('active');
		WeekNotDoneButton.classList.remove('active');

	    SwitchProjectfullyCompleted = "true" ;     
		
		SwitchToDayDue = "false";
		SwitchOverDue  =  "false" ;  
		SwitchHaveDue = "false" ;    	
		SwitchHaveScheduled = "false" ;   
		SwitchDone  = "false" ;      
		SwitchMonthNotDone = "false"; 
		
		SwitchWaitingToDoList = "false" ;
		SwitchGoleNotDone  = "false"; 	
		SwitchNotDone = "false" ; 
		SwitchRecurring  = "false"; 	
		SwitchAnOther  = "false" ;   
		SwitchProjectPartCompleted  = "false";
		SwitchWeekNotDone  = "false"; 

		DateSearch = "" ;         
		Intervalday = ""  ;  
		inputChineseSearch.value = "" ;
		inputDateBlockFilter.value  = "" ;
		
		ContainerStartDateValue = "";
		ContainerEndDateValue = "";    
		ContainerMonthDateValue = "";   
		ContainerWeekDateValue = ""; 
		
		startdateInput.value = ""
		enddateInput.value = "";	
		weekDateInput.value=  "";
		monthDateInput.value= "";

		
		DateSortOption = "completion";
		
		TaskFilterShow();
    
	});
	ProjectfullyCompletedButton.appendChild(ProjectfullyCompletedcountSpan);
	ProjectfullyCompletedButton.appendChild(ProjectfullyCompletedtextSpan);

  // row1 - 07 -  本月未完成  
    const MonthNotDonetextSpan = document.createElement('span');    // 创建一个文本容器 | 存按钮名
	MonthNotDonetextSpan.textContent = '本月未完成';
	
	const MonthNotDonecountSpan = document.createElement('span');   // 创建一个文本容器 | 存数量
	MonthNotDonecountSpan.textContent = MonthNotDoneFilter(TaksDataForCount, "true").length;     

	const MonthNotDoneButton = document.createElement('button');		
	MonthNotDoneButton.className = buttonClassName; // 单独设置类名
	MonthNotDoneButton.addEventListener('click', () => {     // 添加事件监听器
	    // 事件处理逻辑
		MonthNotDoneButton.classList.add('active');

		ToDayDueButton.classList.remove('active');
		OverDueButton.classList.remove('active');		
		HaveDueButton.classList.remove('active');
		HaveScheduledButton.classList.remove('active');		
		DoneButton.classList.remove('active');
		ProjectfullyCompletedButton.classList.remove('active');
	
		
		WaitingToDoButton.classList.remove('active');
		GoleNotDoneButton.classList.remove('active');
		NotDoneButton.classList.remove('active');
		RecurringButton.classList.remove('active');
		AnOtherButton.classList.remove('active');
		ProjectPartCompletedButton.classList.remove('active');
		WeekNotDoneButton.classList.remove('active');

		SwitchMonthNotDone = "true"; 

		SwitchToDayDue = "false";
		SwitchOverDue  =  "false" ;  
		SwitchHaveDue = "false" ;    	
		SwitchHaveScheduled = "false" ;    
		SwitchDone  = "false" 
		SwitchProjectfullyCompleted = "false" ;     
		
		
		SwitchWaitingToDoList = "false" ;
		SwitchGoleNotDone  = "false"; 	
		SwitchNotDone = "false" ; 
		SwitchRecurring  = "false"; 	
		SwitchAnOther  = "false" ;   
		SwitchProjectPartCompleted  = "false";		
		SwitchWeekNotDone  = "false"; 
		
		DateSearch = "" ;         
		Intervalday = ""  ;  
		inputChineseSearch.value = "" ;
		inputDateBlockFilter.value  = "" ;
		
		ContainerStartDateValue = "";
		ContainerEndDateValue = "";    
		ContainerMonthDateValue = "";   
		ContainerWeekDateValue = ""; 
		
		startdateInput.value = ""
		enddateInput.value = "";	
		weekDateInput.value=  "";
		monthDateInput.value= "";


		DateSortOption = "due";
		
		TaskFilterShow();

    
	});
	MonthNotDoneButton.appendChild(MonthNotDonecountSpan);
	MonthNotDoneButton.appendChild(MonthNotDonetextSpan);


  // 将按钮添加到 dv.container 中
	row1.appendChild(ToDayDueButton)
	row1.appendChild(OverDueButton)
	row1.appendChild(HaveDueButton)
	row1.appendChild(HaveScheduledButton)
	row1.appendChild(DoneButton)
	row1.appendChild(ProjectfullyCompletedButton)
	row1.appendChild(MonthNotDoneButton)
	dv.container.appendChild(row1);
	

 // row2 - 创建第02排 容器布局  
   const row2 = createFlexContainer("flex-row", "flex-start");

  // row2 - 01 - 创建+添加 " 待办清单 - WaitingToDoList "  （带追踪事件）
	const WaitingToDotextSpan = document.createElement('span');    // 创建一个文本容器 | 存按钮名
	WaitingToDotextSpan.textContent = '10天内待办';
	
	const WaitingToDocountSpan = document.createElement('span');   // 创建一个文本容器 | 存数量
	WaitingToDocountSpan.textContent = WaitingToDoList(TaksDataForCount, "true", WaitingDayNumber).length;     

	const WaitingToDoButton = document.createElement('button');		
	WaitingToDoButton.className = buttonClassName; // 单独设置类名
	WaitingToDoButton.addEventListener('click', () => {     // 添加事件监听器
	    // 事件处理逻辑
		WaitingToDoButton.classList.add('active');		

		GoleNotDoneButton.classList.remove('active');
		NotDoneButton.classList.remove('active');
		RecurringButton.classList.remove('active');
		AnOtherButton.classList.remove('active');
		ProjectPartCompletedButton.classList.remove('active');
		WeekNotDoneButton.classList.remove('active');


		ToDayDueButton.classList.remove('active');
		OverDueButton.classList.remove('active');		
		HaveDueButton.classList.remove('active');
		HaveScheduledButton.classList.remove('active');		
		DoneButton.classList.remove('active');
		ProjectfullyCompletedButton.classList.remove('active');
		MonthNotDoneButton.classList.remove('active');
	
		SwitchWaitingToDoList = "true" ;
		
		SwitchGoleNotDone  = "false"; 	
		SwitchNotDone = "false" ; 
		SwitchRecurring  = "false"; 	
		SwitchAnOther  = "false" ;   
		SwitchProjectPartCompleted  = "false";
		SwitchWeekNotDone  = "false"; 
		
		SwitchToDayDue = "false";
		SwitchOverDue  =  "false" ;  
		SwitchHaveDue = "false" ;    	
		SwitchHaveScheduled = "false" ;   
		SwitchDone  = "false" ;      
		SwitchProjectfullyCompleted = "false" ;     
		SwitchMonthNotDone = "false"; 
		
		DateSortOption = "due";
		
		TaskFilterShow();

    
	});
	WaitingToDoButton.appendChild(WaitingToDocountSpan);
	WaitingToDoButton.appendChild(WaitingToDotextSpan);


  // row2 - 02 - 创建+添加 "  有规划 | 但未完成   "  （即有 due + 有 scheduled ）
	const GoleNotDonetextSpan = document.createElement('span');    // 创建一个文本容器 | 存按钮名
	GoleNotDonetextSpan.textContent = '计划未完成';
	
	const GoleNotDonecountSpan = document.createElement('span');   // 创建一个文本容器 | 存数量
	GoleNotDonecountSpan.textContent = GoleNotDoneFilter(TaksDataForCount, "true").length;     

	const GoleNotDoneButton = document.createElement('button');		
	GoleNotDoneButton.className = buttonClassName ; // 单独设置类名
	GoleNotDoneButton.addEventListener('click', () => {     // 添加事件监听器
	    // 事件处理逻辑
			GoleNotDoneButton.classList.add('active');

			WaitingToDoButton.classList.remove('active');
			NotDoneButton.classList.remove('active');
			RecurringButton.classList.remove('active');
			AnOtherButton.classList.remove('active');
			ProjectPartCompletedButton.classList.remove('active');
			WeekNotDoneButton.classList.remove('active');
	
	
			ToDayDueButton.classList.remove('active');
			OverDueButton.classList.remove('active');		
			HaveDueButton.classList.remove('active');
			HaveScheduledButton.classList.remove('active');		
			DoneButton.classList.remove('active');
			ProjectfullyCompletedButton.classList.remove('active');
			MonthNotDoneButton.classList.remove('active');



		    SwitchGoleNotDone  = "true"; 
			
			SwitchWaitingToDoList = "false" ;	
			SwitchNotDone = "false" ; 
			SwitchRecurring  = "false"; 	
			SwitchAnOther  = "false" ;   
			SwitchProjectPartCompleted  = "false";
			SwitchWeekNotDone  = "false"; 
			
			SwitchToDayDue = "false";
			SwitchOverDue  =  "false" ;  
			SwitchHaveDue = "false" ;    	
			SwitchHaveScheduled = "false" ;   
			SwitchDone  = "false" ;      
			SwitchProjectfullyCompleted = "false" ;     
			SwitchMonthNotDone = "false"; 

			DateSearch = "" ;         
			Intervalday = ""  ;  
			inputChineseSearch.value = "" ;
			inputDateBlockFilter.value  = "" ;
			
			ContainerStartDateValue = "";
			ContainerEndDateValue = "";    
			ContainerMonthDateValue = "";   
			ContainerWeekDateValue = ""; 
			
			startdateInput.value = ""
			enddateInput.value = "";	
			weekDateInput.value=  "";
			monthDateInput.value= "";





			DateSortOption = "due";
			
			TaskFilterShow();


	});
	GoleNotDoneButton.appendChild(GoleNotDonecountSpan);
	GoleNotDoneButton.appendChild(GoleNotDonetextSpan);

  // row2 - 03 - 创建+添加 "  全部未完成 "  （无 due + 无 scheduled ）（且未完成）
	const NotDonetextSpan = document.createElement('span');    // 创建一个文本容器 | 存按钮名
	NotDonetextSpan.textContent = '全部未完成';
	
	const NotDonecountSpan = document.createElement('span');   // 创建一个文本容器 | 存数量
	NotDonecountSpan.textContent = NotDoneFilter(TaksDataForCount, "true").length;     

	const NotDoneButton = document.createElement('button');		
	NotDoneButton.className = buttonClassName; // 单独设置类名
	NotDoneButton.addEventListener('click', () => {     // 添加事件监听器
	    // 事件处理逻辑
			NotDoneButton.classList.add('active');

			GoleNotDoneButton.classList.remove('active');
			WaitingToDoButton.classList.remove('active');
			RecurringButton.classList.remove('active');
			AnOtherButton.classList.remove('active');
			ProjectPartCompletedButton.classList.remove('active');
			WeekNotDoneButton.classList.remove('active');
	
	
			ToDayDueButton.classList.remove('active');
			OverDueButton.classList.remove('active');		
			HaveDueButton.classList.remove('active');
			HaveScheduledButton.classList.remove('active');		
			DoneButton.classList.remove('active');
			ProjectfullyCompletedButton.classList.remove('active');
			MonthNotDoneButton.classList.remove('active');



			SwitchNotDone = "true" ; 
			
			SwitchWaitingToDoList = "false" ;
			SwitchGoleNotDone  = "false"; 
			SwitchRecurring  = "false"; 	
			SwitchAnOther  = "false" ;   
			SwitchProjectPartCompleted  = "false";
			SwitchWeekNotDone  = "false"; 
			
			SwitchToDayDue = "false";
			SwitchOverDue  =  "false" ;  
			SwitchHaveDue = "false" ;    	
			SwitchHaveScheduled = "false" ;   
			SwitchDone  = "false" ;      
			SwitchProjectfullyCompleted = "false" ;     
			SwitchMonthNotDone = "false"; 

			DateSearch = "" ;         
			Intervalday = ""  ;  
			inputChineseSearch.value = "" ;
			inputDateBlockFilter.value  = "" ;
			
			ContainerStartDateValue = "";
			ContainerEndDateValue = "";    
			ContainerMonthDateValue = "";   
			ContainerWeekDateValue = ""; 
			
			startdateInput.value = ""
			enddateInput.value = "";	
			weekDateInput.value=  "";
			monthDateInput.value= "";



			DateSortOption = "due";
			
			TaskFilterShow();
	    
	});
	NotDoneButton.appendChild(NotDonecountSpan);
	NotDoneButton.appendChild(NotDonetextSpan);

  // row2 - 04 - 创建+添加 "  监控循环任务  "  （无 due + 无 scheduled ）（且未完成）
	const RecurringtextSpan = document.createElement('span');    // 创建一个文本容器 | 存按钮名
	RecurringtextSpan.textContent = '循环未完成';
	
	const RecurringcountSpan = document.createElement('span');   // 创建一个文本容器 | 存数量
	RecurringcountSpan.textContent = RecurringFilter(TaksDataForCount, "true").length;     

	const RecurringButton = document.createElement('button');		
	RecurringButton.className = buttonClassName ; // 单独设置类名
	RecurringButton.addEventListener('click', () => {     // 添加事件监听器
	    // 事件处理逻辑
			RecurringButton.classList.add('active');
		
			WaitingToDoButton.classList.remove('active');
			GoleNotDoneButton.classList.remove('active');		
			NotDoneButton.classList.remove('active');
	
			AnOtherButton.classList.remove('active');
			ProjectPartCompletedButton.classList.remove('active');
			WeekNotDoneButton.classList.remove('active');
	
	
			ToDayDueButton.classList.remove('active');
			OverDueButton.classList.remove('active');		
			HaveDueButton.classList.remove('active');
			HaveScheduledButton.classList.remove('active');		
			DoneButton.classList.remove('active');
			ProjectfullyCompletedButton.classList.remove('active');
			MonthNotDoneButton.classList.remove('active');
	
		    SwitchRecurring  = "true"; 	
			SwitchWaitingToDoList = "false" ;
			SwitchGoleNotDone  = "false"; 
			SwitchNotDone = "false" ; 
			SwitchAnOther  = "false" ;   
			SwitchProjectPartCompleted  = "false";
			SwitchWeekNotDone  = "false"; 
			
			SwitchToDayDue = "false";
			SwitchOverDue  =  "false" ;  
			SwitchHaveDue = "false" ;    	
			SwitchHaveScheduled = "false" ;   
			SwitchDone  = "false" ;      
			SwitchProjectfullyCompleted = "false" ;     
			SwitchMonthNotDone = "false"; 

			DateSearch = "" ;         
			Intervalday = ""  ;  
			inputChineseSearch.value = "" ;
			inputDateBlockFilter.value  = "" ;
			
			ContainerStartDateValue = "";
			ContainerEndDateValue = "";    
			ContainerMonthDateValue = "";   
			ContainerWeekDateValue = ""; 
			
			startdateInput.value = ""
			enddateInput.value = "";	
			weekDateInput.value=  "";
			monthDateInput.value= "";

			
			DateSortOption = "due";
			
			TaskFilterShow();

	});
	RecurringButton.appendChild(RecurringcountSpan);
	RecurringButton.appendChild(RecurringtextSpan);

  // row2 - 05 - 创建+添加 "  有情况  "  （[?] ）（且未完成）
	const AnOthertextSpan = document.createElement('span');    // 创建一个文本容器 | 存按钮名
	AnOthertextSpan.textContent = '意外情况';
	
	const AnOthercountSpan = document.createElement('span');   // 创建一个文本容器 | 存数量
	AnOthercountSpan.textContent =  AnOtherFilter(TaksDataForCount, "true").length;     

	const AnOtherButton = document.createElement('button');		
	AnOtherButton.className = buttonClassName ; // 单独设置类名
	AnOtherButton.addEventListener('click', () => {     // 添加事件监听器
	    // 事件处理逻辑
	    AnOtherButton.classList.add('active');

		WaitingToDoButton.classList.remove('active');
		GoleNotDoneButton.classList.remove('active');		
		NotDoneButton.classList.remove('active');
		RecurringButton.classList.remove('active');		
		ProjectPartCompletedButton.classList.remove('active');
		WeekNotDoneButton.classList.remove('active');


		ToDayDueButton.classList.remove('active');
		OverDueButton.classList.remove('active');		
		HaveDueButton.classList.remove('active');
		HaveScheduledButton.classList.remove('active');		
		DoneButton.classList.remove('active');
		ProjectfullyCompletedButton.classList.remove('active');
		MonthNotDoneButton.classList.remove('active');
		
	    SwitchAnOther  = "true" ;  

		SwitchWaitingToDoList = "false" ;
		SwitchGoleNotDone  = "false"; 
		SwitchNotDone = "false" ; 
		SwitchRecurring  = "false"; 
		SwitchProjectPartCompleted  = "false";
		SwitchWeekNotDone  = "false"; 
		
		SwitchToDayDue = "false";
		SwitchOverDue  =  "false" ;  
		SwitchHaveDue = "false" ;    	
		SwitchHaveScheduled = "false" ;   
		SwitchDone  = "false" ;      
		SwitchProjectfullyCompleted = "false" ; 
		SwitchMonthNotDone = "false";     

		DateSearch = "" ;         
		Intervalday = ""  ;  
		inputChineseSearch.value = "" ;
		inputDateBlockFilter.value  = "" ;
		
		ContainerStartDateValue = "";
		ContainerEndDateValue = "";    
		ContainerMonthDateValue = "";   
		ContainerWeekDateValue = ""; 
		
		startdateInput.value = ""
		enddateInput.value = "";	
		weekDateInput.value=  "";
		monthDateInput.value= "";
		



		DateSortOption = "";
		
		TaskFilterShow();

	});
	AnOtherButton.appendChild(AnOthercountSpan);
	AnOtherButton.appendChild(AnOthertextSpan);

  // row2 - 06 - 创建+添加 "  项目部分完成  "   
	const ProjectPartCompletedtextSpan = document.createElement('span');    // 创建一个文本容器 | 存按钮名
	ProjectPartCompletedtextSpan.textContent = '未完成项目';
	
	const ProjectPartCompletedcountSpan = document.createElement('span');   // 创建一个文本容器 | 存数量
	ProjectPartCompletedcountSpan.textContent =  ProjectPartCompletedFilter(TaksDataForCount, "true").length;     

	const ProjectPartCompletedButton = document.createElement('button');		
	ProjectPartCompletedButton.className = buttonClassName ; // 单独设置类名
	ProjectPartCompletedButton.addEventListener('click', () => {     // 添加事件监听器
	    // 事件处理逻辑
		ProjectPartCompletedButton.classList.add('active');

		WaitingToDoButton.classList.remove('active');
		GoleNotDoneButton.classList.remove('active');		
		NotDoneButton.classList.remove('active');
		RecurringButton.classList.remove('active');		
		AnOtherButton.classList.remove('active');
		WeekNotDoneButton.classList.remove('active');


		ToDayDueButton.classList.remove('active');
		OverDueButton.classList.remove('active');		
		HaveDueButton.classList.remove('active');
		HaveScheduledButton.classList.remove('active');		
		DoneButton.classList.remove('active');
		ProjectfullyCompletedButton.classList.remove('active');
		MonthNotDoneButton.classList.remove('active');

	    SwitchProjectPartCompleted  = "true";
	    
		SwitchWaitingToDoList = "false" ;
		SwitchGoleNotDone  = "false"; 
		SwitchNotDone = "false" ; 
		SwitchRecurring  = "false"; 
		SwitchAnOther  = "false" ;   
		SwitchWeekNotDone  = "false"; 
		
		SwitchToDayDue = "false";
		SwitchOverDue  =  "false" ;  
		SwitchHaveDue = "false" ;    	
		SwitchHaveScheduled = "false" ;   
		SwitchDone  = "false" ;      
		SwitchProjectfullyCompleted = "false" ;    
		SwitchMonthNotDone = "false"; 

		DateSearch = "" ;    
		     
		Intervalday = ""  ;  
		inputChineseSearch.value = "" ;
		inputDateBlockFilter.value  = "" ;
		
		ContainerStartDateValue = "";
		ContainerEndDateValue = "";    
		ContainerMonthDateValue = "";   
		ContainerWeekDateValue = ""; 
		
		startdateInput.value = ""
		enddateInput.value = "";	
		weekDateInput.value=  "";
		monthDateInput.value= "";





		TaskFilterShow();

    
	});
	ProjectPartCompletedButton.appendChild(ProjectPartCompletedcountSpan);
	ProjectPartCompletedButton.appendChild(ProjectPartCompletedtextSpan);

  // row2 - 07 - 本周 - 未完成   
		const WeekNotDonetextSpan = document.createElement('span');    // 创建一个文本容器 | 存按钮名
	WeekNotDonetextSpan.textContent = '本周未完成';
	
	const WeekNotDonecountSpan = document.createElement('span');   // 创建一个文本容器 | 存数量
	WeekNotDonecountSpan.textContent = WeekNotDoneFilter(TaksDataForCount, "true").length;     

	const WeekNotDoneButton = document.createElement('button');		
	WeekNotDoneButton.className = buttonClassName; // 单独设置类名
	WeekNotDoneButton.addEventListener('click', () => {     // 添加事件监听器
	    // 事件处理逻辑
			WeekNotDoneButton.classList.add('active');

			WaitingToDoButton.classList.remove('active');
			GoleNotDoneButton.classList.remove('active');		
			NotDoneButton.classList.remove('active');
			RecurringButton.classList.remove('active');		
			AnOtherButton.classList.remove('active');
			ProjectPartCompletedButton.classList.remove('active');
	
			ToDayDueButton.classList.remove('active');
			OverDueButton.classList.remove('active');		
			HaveDueButton.classList.remove('active');
			HaveScheduledButton.classList.remove('active');		
			DoneButton.classList.remove('active');
			ProjectfullyCompletedButton.classList.remove('active');
			MonthNotDoneButton.classList.remove('active');

			
			SwitchWeekNotDone  = "true"; 
			
			SwitchWaitingToDoList = "false" ;
			SwitchGoleNotDone  = "false"; 
			SwitchNotDone = "false" ; 
			SwitchRecurring  = "false"; 	
			SwitchAnOther  = "false" ;   
			SwitchProjectPartCompleted  = "false";
			
			
			SwitchToDayDue = "false";
			SwitchOverDue  =  "false" ;  
			SwitchHaveDue = "false" ;    	
			SwitchHaveScheduled = "false" ;   
			SwitchDone  = "false" ;      
			SwitchProjectfullyCompleted = "false" ;     
			SwitchMonthNotDone = "false"; 

			DateSearch = "" ;         
			Intervalday = ""  ;  
			inputChineseSearch.value = "" ;
			inputDateBlockFilter.value  = "" ;
			
			ContainerStartDateValue = "";
			ContainerEndDateValue = "";    
			ContainerMonthDateValue = "";   
			ContainerWeekDateValue = ""; 
			
			startdateInput.value = ""
			enddateInput.value = "";	
			weekDateInput.value=  "";
			monthDateInput.value= "";

			DateSortOption = "due";
			
			TaskFilterShow();
	    
	});
	WeekNotDoneButton.appendChild(WeekNotDonecountSpan);
	WeekNotDoneButton.appendChild(WeekNotDonetextSpan);

  // 按钮窗口装载
	  row2.appendChild(WaitingToDoButton);
	  row2.appendChild(GoleNotDoneButton);
	  row2.appendChild(NotDoneButton);
	  row2.appendChild(RecurringButton);
	  row2.appendChild(AnOtherButton);
	  row2.appendChild(ProjectPartCompletedButton);
	  row2.appendChild(WeekNotDoneButton)
	  dv.container.appendChild(row2);


 // row3 - 创建第03排 容器布局  
   const row3 = createFlexContainer("flex-row", "flex-start");

  // rows3 - 01  - Month 类型容器 
	const labelContainerMonth = document.createElement("label");
	labelContainerMonth.innerText = "Month-月";
	labelContainerMonth.className = "label-row3-Month";              // 单独设置类名

	let monthDateInput = document.createElement("input");
	monthDateInput.type = "month";
	monthDateInput.classList.add("MonthContainer");    // 添加 CSS 类
	monthDateInput.addEventListener("change", function() {    // 添加事件监听器，
		 event.preventDefault() // 这个就是防误触（很复杂 ，你加就对了）	 
	     debouncedUpdateMonth(event.target.value);	     
	    //dv.paragraph(`监控的月份容器 值  : ${ContainerMonthDateValue}`);
		});

  // rows3 - 02 -  Week 类型容器 
	const labelContainerWeek = document.createElement("label");
	labelContainerWeek.innerText = "Week-周";
	labelContainerWeek.className = "label-row3-Week";              // 单独设置类名

	let weekDateInput = document.createElement("input");
	weekDateInput.type = "week";
	weekDateInput.classList.add("WeekContainer");    // 添加 CSS 类
	weekDateInput.addEventListener("change", function() {    // 添加事件监听器，
	    event.preventDefault() // 这个就是防误触（很复杂 ，你加就对了）	
        debouncedUpdateWeek(event.target.value);
	    //dv.paragraph(`监控的 week 周的值  : ${ContainerWeekDateValue}`);
		});
	//weekDateInput.value = today;

  // rows3 - 03  - 创建日期 day - 起点 Start - 输入容器
	const labelContainerDayStart = document.createElement("label");
	 labelContainerDayStart.innerText = "日期-起点";
	 labelContainerDayStart.className = "label-row3-DayStart";              // 单独设置类名
 
	let startdateInput = document.createElement("input");
	startdateInput.type = "date";
	startdateInput.className = "DayContainer" ;    // 添加 CSS 类
	startdateInput.addEventListener("change", function() {    // 添加事件监听器，    
	    event.preventDefault() // 这个就是防误触（很复杂 ，你加就对了）	    
	    //dv.paragraph(`监控的开始日期值 : ${ ContainerStartDateValue}`);
	    debouncedUpdateStart(event.target.value);
		});

  // rows3 - 04  - 创建日期 day -终点 end- 输入容器
	const labelContainerDayEnd = document.createElement("label");
	 labelContainerDayEnd.innerText = "日期终点";
	 labelContainerDayEnd.className = "label-row3-DayEnd";              // 单独设置类名
 
	let enddateInput = document.createElement("input");
	enddateInput.type = "date";
	enddateInput.className = "DayContainer" ;    // 添加 CSS 类
	enddateInput.addEventListener("change", function() {    // 添加事件监听器，
		event.preventDefault() // 这个就是防误触（很复杂 ，你加就对了）	  
		debouncedUpdateEnd(event.target.value);
		
	    //dv.paragraph(`监控的结束日期值 : ${ContainerEndDateValue }`);
		});
	//enddateInput.value = formattedToday;

  // 按钮窗口装载
	row3.appendChild(labelContainerMonth)
	row3.appendChild(monthDateInput)
	row3.appendChild(labelContainerWeek)
	row3.appendChild(weekDateInput)	
	row3.appendChild(labelContainerDayStart)
	row3.appendChild(startdateInput)
	
	row3.appendChild(labelContainerDayEnd)
	row3.appendChild(enddateInput)
	
	dv.container.appendChild(row3);


 // row4 - 创建第04排 容器布局  
   const row4 = createFlexContainer("flex-row", "flex-start");

  // row4 - 01 - 创建+添加 "文本输入框" （中文日期搜索） 
	const labelChineseSearch = document.createElement("label");
	labelChineseSearch.innerText = "日期搜索";
	labelChineseSearch.className = "label-row4-01-ChineseSearch";              // 单独设置类名
	
	const inputChineseSearch= createInputField("多关键字 用逗号空格等隔开", "");
	inputChineseSearch.className = "inputFilter-row4-01-ChineseSearch";     // 单独设置类名
	inputChineseSearch.addEventListener("input", (event) => {    
	     event.preventDefault(); // 这个就是防误触（很复杂 ，你加就对了）
	     debouncedUpdateChineseSearch(event.target.value); 

	     //filterPages();
	     ///fy();
	     
	     ;
    
	 });


  // row4 - 02 - 创建+添加 "文本输入框" （时间块搜索）+ （带追踪事件）
	const labelDateBlockFilter = document.createElement("label");
	labelDateBlockFilter.innerText = "时间块搜";
	labelDateBlockFilter.className = "label-row4-02-DateBlock";              // 单独设置类名
	

	const inputDateBlockFilter= createInputField("-1 昨天，0 今天，+1 明天", "");
	inputDateBlockFilter.className = "inputFilter-row4-02-DateBlock";     // 单独设置类名
	inputDateBlockFilter.addEventListener("input", (event) => {    
	     event.preventDefault() // 这个就是防误触（很复杂 ，你加就对了）
	     debouncedUpdateBlockFilter(event.target.value);
	     ;
    
		});

  // row4 - 03 - 创建+添加清空按钮 + （带追踪事件）
	const buttonClearAllDate= document.createElement("button");
	 buttonClearAllDate.innerText = "清空 Date";
	 buttonClearAllDate.className = "button-Clear"; // 单独设置类名

	 buttonClearAllDate.addEventListener("click", () => {
		 event.preventDefault() // 这个就是防误触（很复杂 ，你加就对了）		  
         debouncedUpdateClearAllDate()

		});

  // 按钮窗口装载
	row4.appendChild(labelChineseSearch);
	row4.appendChild(inputChineseSearch);
	row4.appendChild(labelDateBlockFilter);
	row4.appendChild(inputDateBlockFilter);
	row4.appendChild(buttonClearAllDate)
	
	dv.container.appendChild(row4);


 // row5 - 创建第05排 容器布局  
   const row5 = createFlexContainer("flex-row", "flex-start");

   // row5 - 01 - 创建+添加 "文本输入框" （搜索 text 文本）+ （带追踪事件）
		const labelTextString = document.createElement("label");
		labelTextString.innerText = "Text 搜索";
		labelTextString.className = "label-Row5-Text"; // 单独设置类名
	
		const inputFieldTextString = createInputField("多个关键字 用逗号空格等隔开", "");
		inputFieldTextString.className = "input-Row5-Text"; // 单独设置类名
		inputFieldTextString.addEventListener("input", (event) => {    
			event.preventDefault() // 这个就是防误触（很复杂 ，你加就对了）	
		    debouncedUpdateInputTextSearch(event.target.value);
	    
			});

   // row5 - 02 - 创建+添加 "文本输入框" （搜索 Tags） 
		const labelTags = document.createElement("label");
		labelTags.innerText = "Tags 搜索";
		labelTags.className = "label-Row5-Text"; // 单独设置类名
	
		const inputFieldTags = createInputField("多个关键字 用逗号空格等隔开", "");
		inputFieldTags.className = "input-Row5-Text"; // 单独设置类名
		inputFieldTags.addEventListener("input", (event) => {    
			event.preventDefault() // 这个就是防误触（很复杂 ，你加就对了）	
		    debouncedUpdateInputTags(event.target.value);
	    
			});

   // row5 - 03 - 创建+添加 "文本输入框" （搜索 Section） 
		const labelSection = document.createElement("label");
		labelSection.innerText = "Section 搜";
		labelSection.className = "label-Row5-Text"; // 单独设置类名
	
		const inputFieldSection = createInputField("多个关键字 用逗号空格等隔开", "");
		inputFieldSection.className = "input-Row5-Text"; // 单独设置类名
		inputFieldSection.addEventListener("input", (event) => {    
			event.preventDefault() // 这个就是防误触（很复杂 ，你加就对了）	
		    debouncedUpdateInputSection(event.target.value);
	    
			});

  // row5 - 04 - 创建+添加清空按钮 + （带追踪事件）
	const buttonClearAllString = document.createElement("button");
	 buttonClearAllString.innerText = "清空条件";
	 buttonClearAllString.className = "button-Clear"; // 单独设置类名

	 buttonClearAllString.addEventListener("click", () => {
		 event.preventDefault() // 这个就是防误触（很复杂 ，你加就对了）	 
	     debouncedUpdateClearAllStringSearch();      

		});



  // 按钮窗口装载
	row5.appendChild(labelTextString);
	row5.appendChild(inputFieldTextString);
	row5.appendChild(labelTags);
	row5.appendChild(inputFieldTags);
	row5.appendChild(labelSection);
	row5.appendChild(inputFieldSection);
	row5.appendChild(buttonClearAllString)
	dv.container.appendChild(row5);


 // row6 - 创建第06排 容器布局  
	 const row6 = createFlexContainer("flex-row", "flex-start");

  // row6 - 01 - 创建+添加第一个下拉选项框- 按什么排序区域的 （这个是文本 string ， StringSortOption）
	const labelStringSort = document.createElement("label");
	labelStringSort.innerText = "按 String 排";
	labelStringSort.className = "label-row6-StringSort-Option"; // 单独设置类名
	
	const selectStringSortOption = createSelectField([" ","text", "tags","OnlyHead","FileName"]);
	selectStringSortOption.className = "select-row6-StringSort-Option"; // 单独设置类名
	selectStringSortOption.addEventListener("change", (event) => {
       event.preventDefault() // 这个就是防误触（很复杂 ，你加就对了）
	   debouncedUpdateStringSortOption(event.target.value);
		});

  // row6 - 02 - 创建+添加  "下拉选项框" (排序升序降序的) 
	
	const selectStringSortOrder = createSelectField(["升序", "降序"], "升序");
	selectStringSortOrder.className = "select-row6-StringSort-Order"; // 单独设置类名
	selectStringSortOrder.addEventListener("change", (event) => {
		event.preventDefault() // 这个就是防误触（很复杂 ，你加就对了）	    
	    debouncedUpdateStringSortOrder(event.target.value);
    
		});

  // row6 - 03 - 创建+添加第2个下拉选项框-  第2个时间排序区域的 （这个是 Date ， DateSortOption）
	const labelDateSort = document.createElement("label");
	labelDateSort.innerText = "按 Date 排";
	labelDateSort.className = "label-row6-DateSort-Option"; // 单独设置类名
	
	const selectDateSortOption = createSelectField(["","due", "scheduled","completion"]);
	selectDateSortOption.className = "select-row6-DateSort-Option"; // 单独设置类名
	selectDateSortOption.addEventListener("change", (event) => {
       event.preventDefault() // 这个就是防误触（很复杂 ，你加就对了）
	   debouncedUpdateDateSortOption(event.target.value);
		});

  // row6 - 04 - 创建+添加  "下拉选项框" (排序升序降序的) 
	const selectDateSortOrder = createSelectField(["升序", "降序"], "升序");
	selectDateSortOrder.className = "select-row6-DateSort-Order"; // 单独设置类名
	selectDateSortOrder.addEventListener("change", (event) => {
		event.preventDefault() // 这个就是防误触（很复杂 ，你加就对了）
	    //DateSortOrder = getDateSortOrder(event.target.value) ;
	    debouncedUpdateDateSortOrder(event.target.value);
    
		});

  // row6 - 05 - 对于任务，是否按文章分组？ 可自己选择； 
	const labelGroup = document.createElement("label");
	labelGroup.innerText = "是否分组";
	labelGroup.className = "label-row6-Group"; // 单独设置类名
	
	const selectGroup = createSelectField(["不分组", "按 File 分组"], "不分组");
	selectGroup .className = "select-row6-Group"; // 单独设置类名
	selectGroup .addEventListener("change", (event) => {
		event.preventDefault() // 这个就是防误触（很复杂 ，你加就对了）	    
	    debouncedUpdateGroupByPage(event.target.value);
    
		});


  // 按钮窗口装载


	row6.appendChild(labelStringSort );
    row6.appendChild(selectStringSortOption);
    
    //row6.appendChild(labelStringSortOrder);
    row6.appendChild(selectStringSortOrder);
    
    row6.appendChild(labelDateSort );
    row6.appendChild(selectDateSortOption);

	//row6.appendChild(labelDateSortOrder);
    row6.appendChild(selectDateSortOrder);
	row6.appendChild(labelGroup);
    row6.appendChild(selectGroup);
    
	dv.container.appendChild(row6);



function TaskFilterShow() {
	(async () => {
	 //  00  --  获取所有 task  清理掉空的 任务   
		
		let TaksData = dv.pages().file.tasks.array().map(task => {
		    let page = dv.page(task.path);
		    let formattedCtime = formatFullDate(page.file.ctime);
		    let formattedMtime = formatFullDate(page.file.mtime);
			    return {
			        ...task,
			        ctime: page.file.ctime,     
			        mtime: page.file.mtime
				    };
			});

	    TaksData = TaksData.filter(task => task.text.trim() !== "");   // 清理掉空的任务
		TaksData = TaksData.filter(task => task.text.length >= 1);
		TaksData = cleanAllEmptyTasks(TaksData);    // 递归清到子项空的任务 
		
     //  01 -- 增加 key  -- 目前是3个 ~   FileName    |    OnlyHead |   Project  | 一堆日期 key 
		TaksData = AddKeyForTasks(TaksData);        
		TaksData = TaksData.map(addDateKeysToTask);  
		//dv.paragraph(TaksData.length);
		
	 //  选项卡 -- Row1   -- 7个  
		TaksData = ToDayDueFilter(TaksData, SwitchToDayDue);       // 01 - 今天到期的 due = 今天 
		TaksData = OverDueFilter(TaksData, SwitchOverDue);         // 02 - 已经超期  due < 今天 的	
		TaksData = HaveDueFilter(TaksData, SwitchHaveDue) ;     // 03 -- 有 due ，有截止 		
		
		TaksData  =  HaveScheduledFilter(TaksData, SwitchHaveScheduled)  // 04 -- 有安排，有 Scheduled		
		TaksData =   DoneFilter(TaksData, SwitchDone);              // 05 - 已完成  全部 done 的
		TaksData =   ProjectfullyCompletedFilter(TaksData, SwitchProjectfullyCompleted);   // 06 --  项目彻底完成 
		
		TaksData = MonthNotDoneFilter(TaksData, SwitchMonthNotDone)  // 07 -- 本月 未完成 的哈  
			
	 //  选项卡 -- Row2  -- 7个  
	 
		TaksData =   WaitingToDoList(TaksData, SwitchWaitingToDoList, WaitingDayNumber) ;  // 01 --  待办清单 
		TaksData =   GoleNotDoneFilter(TaksData, SwitchGoleNotDone)  // 02 --  有规划 | 但未完成
		TaksData = NotDoneFilter(TaksData,SwitchNotDone);       // 03 -- 待分配安排
	
		TaksData =   ProjectPartCompletedFilter(TaksData, SwitchProjectPartCompleted);     //  04 --  项目部分完成 
		TaksData =  AnOtherFilter(TaksData, SwitchAnOther);       // 05 - 意外情况； AnOtherFilter
		TaksData =   RecurringFilter(TaksData, SwitchRecurring)     // 06 -- 未完成的循环任务	
		
		TaksData  =   WeekNotDoneFilter(TaksData, SwitchWeekNotDone)  // 07 - 本周未完成  

	 //  选项卡 -- Row3  
		
		
			
	 //  选项卡 -- Row4 - Task 自带属性"筛选"  -- Text 文本 | 标签 tags | 所属 Section | FileName | Path 路径
		 //（不写限定 ，就不过滤 ）
		TaksData = TextFilter(TaksData, TextSearch);
		TaksData = TagsFilter(TaksData, TagsSearch);
	    TaksData =  HeadSectionFilter(TaksData, HeadSectionSearch);
		TaksData =  FileNameFilter(TaksData, FileNameSearch)
		TaksData =  PathFilter(TaksData, PathSearch);


		//dv.paragraph(TaksData.length);
		//dv.paragraph(TaksData[0]);


	 //  选项卡 -- Row5 -- 时间容器 + 中文搜索 类筛选  不要看着像是没有函数，是内嵌入在以上的筛选卡之中了的 
	
	 //  选项卡 -- Row7  -- 排序  

		// 按第一组变量分组并排序
			let groupedTasks = TaksData.reduce((groups, task) => {
			    const key = task[StringSortOption] || task[''];  // 使用任务的某个 key 作为分组依据，默认使用 text
			    (groups[key] = groups[key] || []).push(task);
			    return groups;
			}, {});
			
			let sortedGroupedTasks = Object.entries(groupedTasks)
			    .sort(([keyA], [keyB]) => {
			        // 处理 tags 键的特殊情况
			        let a = keyA;
			        let b = keyB;
			        
			        if (StringSortOption === 'tags') {
			            a = Array.isArray(keyA) ? keyA.join(',') : keyA; // 将 tags 数组转换为字符串
			            b = Array.isArray(keyB) ? keyB.join(',') : keyB; // 将 tags 数组转换为字符串
			        }
			        
			        return StringSortOrder === 'asc' ? a.localeCompare(b) : b.localeCompare(a);
			    })
			    .reduce((sortedGroups, [key, value]) => {
			        sortedGroups[key] = value;
			        return sortedGroups;
			    }, {});
		
		// 对每个分组内部再进行第二组排序
			let ListRows = [];  // 存这个展示的数据  
			Object.entries(sortedGroupedTasks).forEach(([key, tasks]) => {
			    tasks.sort((taskA, taskB) => {
			        const dateA = new Date(taskA[DateSortOption]);
			        const dateB = new Date(taskB[DateSortOption]);
			        return DateSortOrder === 'asc' ? dateA - dateB : dateB - dateA;
			    });
			    ListRows = ListRows.concat(tasks); // 将排序后的 tasks 添加到 ListRows 中
			});

	// 删除之前的任务列表元素 
		const elementsToRemove = document.querySelectorAll(".contains-task-list, .dataview.dataview-error-box");
		elementsToRemove.forEach(element => element.remove());
	
	// 先把是否分组的判断开关，得转换成布尔值的类型； 
		let showGroup = SwitchGroup === "true";      // 因为那个变量，是 string 我们得强制 转一下布尔 
		
	// 如果 showGroup 是 false，删除之前分组的结果；原因：如果是先是分组，再不分，那么，之前分组的结果依然在页面上 
		if (!showGroup) {
			// 删除包含分组结果的元素
			const resultGroups = document.querySelectorAll('.dataview.result-group');
			resultGroups.forEach(element => element.remove());
		
			// 删除分组页名称的 <h4> 标签
			const groupHeaders = document.querySelectorAll('h4');
			groupHeaders.forEach(element => {
				if (element.querySelector('a.internal-link')) {
					element.remove();
				}
			});
		}
		
		//dv.paragraph(ListRows.length);
		//dv.paragraph(ListRows[0].text.length);
		//dv.paragraph(typeof(ListRows[0].project));
		//dv.paragraph(`DateSearch - 年 - 处理之后 : ${JSON.stringify(ListRows[0].project)}`);

		dv.taskList(ListRows, showGroup); // 使用布尔类型的变量作为参数


	})();
	
	}

TaskFilterShow()


// 防抖打包  --全部的

    // row3 -- 时间容器打包  4个
	  // 01 -- 月度容器 
	    const debouncedUpdateMonth  = debounce ((value) => {    
	    ContainerMonthDateValue = value;

	    startdateInput.value = "";
	    enddateInput.value = "";	   
	    weekDateInput.value=  "";

        ContainerStartDateValue = "";
        ContainerEndDateValue  =  "";                    
        ContainerWeekDateValue =  "";

	    DateSearch  = "" ;
        Intervalday =  "" ;	    
        inputChineseSearch.value = "" ;
	    inputDateBlockFilter.value  = "" ;
	    
	    
	    TaskFilterShow();
		}, 100);
      // 02 -- 周容器 
        const debouncedUpdateWeek  = debounce ((value) => {    
	     ContainerWeekDateValue= value;

	     startdateInput.value = "";
	     enddateInput.value = "";
	     monthDateInput.value= "";
	   

	     ContainerStartDateValue = "";
	     ContainerEndDateValue  =  "";
	     ContainerMonthDateValue  =  "";
                    

	     DateSearch  = "" ;
	     Intervalday = "" ;	     
	     inputChineseSearch.value = "" ;
	     inputDateBlockFilter.value  = "" ;

	     TaskFilterShow();
		}, 100);
      // 03 -- day - 起点 strart
	   const debouncedUpdateStart  = debounce ((value) => {    
	    ContainerStartDateValue  = value;   
	    
	    ContainerMonthDateValue  =  "";
	    ContainerWeekDateValue =  "";   

	    monthDateInput.value = "";
	    weekDateInput.value=  "";

	    DateSearch  = "" ;             // row4的值全部清空，包含全局变量
	    Intervalday =  "" ;
	    inputChineseSearch.value = "" ;
	    inputDateBlockFilter.value  = "" ;


	    TaskFilterShow();
		}, 100);
      // 04 -- day - 终点 end
	    const debouncedUpdateEnd = debounce ((value) => {    
	     ContainerEndDateValue = value;

         ContainerMonthDateValue  =  "";
         ContainerWeekDateValue =  "";

	     monthDateInput.value= "";
	     weekDateInput.value=  "";


	     DateSearch  = "" ;
         Intervalday =   "" ;
         inputChineseSearch.value = "" ;
	     inputDateBlockFilter.value  = "" ;


		 TaskFilterShow();
		 }, 100);

    // row4 -- 日期搜索的打包  3个
	    // 01 - 中文日期搜索 
	    
			const debouncedUpdateChineseSearch = debounce ((value) => {    
			    DateSearch  = value;           // 自己值更新到全局变量
			    Intervalday   = "" ;           // 其他全局变量，都要清空，因为是相斥关系 
			    
			    inputDateBlockFilter.value  = "" ;   // 另外2个要清空，因为是相斥关系 
			    
		
			    startdateInput.value = "";
			    enddateInput.value = "";
			    monthDateInput.value= "";
			    weekDateInput.value=  "";
		
			    ContainerStartDateValue = "";
			    ContainerEndDateValue  =  "";
			    ContainerMonthDateValue  =  "";
			    ContainerWeekDateValue =  "";
		
			    TaskFilterShow();
				}, 100);

		// 02 - 时间块搜索 
			 const debouncedUpdateBlockFilter  = debounce ((value) => {    
			    Intervalday = value;
			    DateSearch  = "" ;
			    
			    inputChineseSearch.value = "" ;
			    
			    startdateInput.value = "";
			    enddateInput.value = "";
			    monthDateInput.value= "";
			    weekDateInput.value=  "";
		
			     ContainerStartDateValue = "";
			    ContainerEndDateValue  =  "";
			    ContainerMonthDateValue  =  "";
			    ContainerWeekDateValue =  "";
		
			    TaskFilterShow();
				}, 100);

		// 03 - 时间搜索条件清空 
			const debouncedUpdateClearAllDate = debounce ((value) => {    	   
			   DateSearch =  "";
			   Intervalday   = "" ;
			   inputChineseSearch.value = "" ;
			   inputDateBlockFilter.value  = "" ;
		
			   startdateInput.value = "";
			   enddateInput.value = "";
			   monthDateInput.value= "";
			   weekDateInput.value=  "";
		
			   ContainerStartDateValue = "";
			   ContainerEndDateValue  =  "";
			   ContainerMonthDateValue  =  "";
			   ContainerWeekDateValue =  "";
		
			   TaskFilterShow();
				}, 100);

    // row5 -- string 搜索的  4个
		// 01 - Text 文本搜索 
			const debouncedUpdateInputTextSearch = debounce((value) => {
			    TextSearch = value;
			    TaskFilterShow();
				}, 200);
		 
		// 02 - Tags 标签搜索 
			const debouncedUpdateInputTags= debounce((value) => {
			    TagsSearch = value;
			    TaskFilterShow();
				}, 300);
		
		// 03 - Section | Head 所属区域搜索
				const debouncedUpdateInputSection = debounce((value) => {
				    HeadSectionSearch  = value;
				    TaskFilterShow();
					}, 300);
				
		// 04 - 清空  
			const debouncedUpdateClearAllStringSearch = debounce ((value) => {    	   
					TextSearch = " "  ;          // 01 -- 就是 task 的那个文本 
					TagsSearch = "  " ;          // 02 -- 就是 task 的那个文本 
					HeadSectionSearch  = "  " ;  // 03 -- 就是 task 的那个文本 
					
					inputFieldTextString.value = ""    ;
					inputFieldTags.value = ""    ;
					inputFieldSection.value = ""    ;
					TaskFilterShow();
					
				}, 100); 
	    
    // row6 -- 排序打打包  5个  
	  // 01 -- 按 String 排序 -- 排序区域 ~ [text、tags、 OnlyHead 、FileName]
	  	const debouncedUpdateStringSortOption= debounce((value) => {
		    StringSortOption = value;
		    TaskFilterShow();
			}, 100);

	  // 02 -- 按 String 排序 -- 排序方向 ~ [asc 、desc]
	  	const debouncedUpdateStringSortOrder= debounce ((value) => {    
		    StringSortOrder = getSortOrder (value);
		    TaskFilterShow();
			}, 100);
			
	  // 03 -- 按 Date 排序  -- 排序区域  ~ [due 、scheduled 、 completion]
	  	const debouncedUpdateDateSortOption= debounce((value) => {
		    DateSortOption = value;
		    TaskFilterShow();
			}, 100);

	  // 04 -- 按 Date 排序  -- 排序方向  ~ [asc 、desc]
	  	const debouncedUpdateDateSortOrder = debounce ((value) => {    
		    DateSortOrder = getSortOrder (value);
		    TaskFilterShow();
			}, 100);
	  // 05 -- 是否按 Page - 分组 ~ [不分就是看不到所在的 Page 哈] - 默认不分  
		const debouncedUpdateGroupByPage = debounce((value) => {
		    SwitchGroup = getGroup(value);
		    TaskFilterShow();
			}, 100);

