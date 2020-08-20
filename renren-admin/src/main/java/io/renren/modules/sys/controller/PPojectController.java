package io.renren.modules.sys.controller;

import java.util.Arrays;
import java.util.Map;

import io.renren.common.validator.ValidatorUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.renren.modules.sys.entity.PPojectEntity;
import io.renren.modules.sys.service.PPojectService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 项目表
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-08-18 14:40:27
 */
@RestController
@RequestMapping("sys/ppoject")
public class PPojectController {
    @Autowired
    private PPojectService pPojectService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:ppoject:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = pPojectService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @RequiresPermissions("sys:ppoject:info")
    public R info(@PathVariable("id") Integer id){
        PPojectEntity pPoject = pPojectService.getById(id);

        return R.ok().put("pPoject", pPoject);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:ppoject:save")
    public R save(@RequestBody PPojectEntity pPoject){
        pPojectService.save(pPoject);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:ppoject:update")
    public R update(@RequestBody PPojectEntity pPoject){
        ValidatorUtils.validateEntity(pPoject);
        pPojectService.updateById(pPoject);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:ppoject:delete")
    public R delete(@RequestBody Integer[] ids){
        pPojectService.removeByIds(Arrays.asList(ids));

        return R.ok();
    }

}
